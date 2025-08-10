# 🛒 Complete Guest Checkout Backend Integration Plan

## 🎯 Project Architecture Overview

This is a **guest-only e-commerce platform** - customers can browse, shop, and purchase without creating accounts. All customer data is handled through email-based order tracking and one-time transactions.

### Core Principles:

- **Zero User Authentication** - No user accounts, passwords, or sessions
- **Email-Based Communication** - All order tracking via email
- **Stateless Transactions** - Each purchase is independent
- **Privacy-First** - Minimal data collection and storage
- **Mobile-Optimized** - Fast checkout on any device

---

## 🗄️ Database Schema Design (Supabase)

### **1. Categories Table**

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);
```

### **2. Products Table**

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),

  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  cost_price DECIMAL(10,2), -- For profit calculations

  -- Organization
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  brand VARCHAR(100),
  sku VARCHAR(100) UNIQUE,

  -- Media
  images JSON DEFAULT '[]'::json, -- Array of image URLs
  primary_image VARCHAR(500),

  -- Product Details
  features JSON DEFAULT '[]'::json, -- Array of feature strings
  specifications JSON DEFAULT '{}'::json, -- Key-value pairs

  -- Inventory
  track_inventory BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 10,
  allow_backorders BOOLEAN DEFAULT false,

  -- SEO & Marketing
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),

  -- Product Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,

  -- Customer Reviews (aggregated)
  average_rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Constraints
  CONSTRAINT positive_price CHECK (price >= 0),
  CONSTRAINT positive_stock CHECK (stock_quantity >= 0)
);
```

### **3. Guest Orders Table**

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., "ORD-2024-001234"

  -- Customer Information (Guest - No Account)
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),

  -- Shipping Address
  shipping_first_name VARCHAR(100) NOT NULL,
  shipping_last_name VARCHAR(100) NOT NULL,
  shipping_company VARCHAR(100),
  shipping_address_line_1 TEXT NOT NULL,
  shipping_address_line_2 TEXT,
  shipping_city VARCHAR(100) NOT NULL,
  shipping_state VARCHAR(100) NOT NULL,
  shipping_postal_code VARCHAR(20) NOT NULL,
  shipping_country VARCHAR(100) DEFAULT 'United States',

  -- Order Totals
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(4,4) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,

  -- Payment Information
  payment_method VARCHAR(50) NOT NULL, -- 'stripe_card', 'paypal'
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_intent_id VARCHAR(255), -- Stripe payment intent ID

  -- Order Status & Fulfillment
  order_status VARCHAR(50) DEFAULT 'processing',
  tracking_number VARCHAR(100),

  -- Email Tracking (for guest orders)
  confirmation_email_sent BOOLEAN DEFAULT false,
  shipping_email_sent BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **4. Order Items Table**

```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE RESTRICT,

  -- Product snapshot (preserve data even if product changes)
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  product_image VARCHAR(500),

  -- Order details
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  line_total DECIMAL(10,2) NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🏗️ Next.js API Routes Architecture

### **1. Products API (`/api/products/route.ts`)**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const ProductsQuerySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("20"),
  category: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(["price_asc", "price_desc", "name_asc", "newest"]).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = ProductsQuerySchema.parse(Object.fromEntries(searchParams));

    const supabase = createClient();

    let query = supabase
      .from("products")
      .select(
        `
        id, name, slug, price, original_price,
        primary_image, brand, average_rating, review_count
      `
      )
      .eq("is_active", true);

    // Apply filters and pagination
    if (params.category) {
      query = query.eq("category_slug", params.category);
    }

    const page = parseInt(params.page);
    const limit = parseInt(params.limit);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: products, error } = await query.range(from, to);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### **2. Order Creation API (`/api/orders/route.ts`)**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const supabase = createClient();

    // 1. Validate products and calculate totals
    const { data: products } = await supabase
      .from("products")
      .select("id, name, price, stock_quantity")
      .in(
        "id",
        orderData.items.map((item) => item.product_id)
      );

    let subtotal = 0;
    const orderItems = orderData.items.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;
      return {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        quantity: item.quantity,
        line_total: lineTotal,
      };
    });

    const taxAmount = subtotal * 0.0875; // 8.75% tax
    const totalAmount = subtotal + taxAmount;

    // 2. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "usd",
      receipt_email: orderData.customer_email,
    });

    // 3. Create order in database
    const { data: order } = await supabase
      .from("orders")
      .insert({
        customer_email: orderData.customer_email,
        shipping_first_name: orderData.shipping_first_name,
        shipping_last_name: orderData.shipping_last_name,
        shipping_address_line_1: orderData.shipping_address_line_1,
        shipping_city: orderData.shipping_city,
        shipping_state: orderData.shipping_state,
        shipping_postal_code: orderData.shipping_postal_code,
        subtotal,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        payment_method: "stripe_card",
        payment_intent_id: paymentIntent.id,
      })
      .select()
      .single();

    // 4. Create order items
    const orderItemsWithOrderId = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    await supabase.from("order_items").insert(orderItemsWithOrderId);

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_number: order.order_number,
        payment_intent_id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
```

### **3. Guest Order Tracking API (`/api/orders/track/route.ts`)**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { order_number, customer_email } = await request.json();

    const supabase = createClient();

    const { data: order, error } = await supabase
      .from("orders")
      .select(
        `
        order_number, order_status, payment_status,
        total_amount, created_at, tracking_number,
        order_items (product_name, quantity, unit_price)
      `
      )
      .eq("order_number", order_number)
      .eq("customer_email", customer_email)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

---

## 💳 Stripe Payment Integration

### **Webhook Handler (`/api/webhooks/stripe/route.ts`)**

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { sendOrderConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const supabase = createClient();

      // Update order status
      const { data: order } = await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          order_status: "processing",
        })
        .eq("payment_intent_id", paymentIntent.id)
        .select()
        .single();

      if (order) {
        // Send confirmation email
        await sendOrderConfirmationEmail({
          order_id: order.id,
          customer_email: order.customer_email,
          order_number: order.order_number,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
```

---

## 📧 Email Integration (Resend)

### **Email Service (`/lib/email/index.ts`)**

```typescript
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail({
  order_id,
  customer_email,
  order_number,
}: {
  order_id: number;
  customer_email: string;
  order_number: string;
}) {
  try {
    const supabase = createClient();

    const { data: order } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (product_name, quantity, unit_price, line_total)
      `
      )
      .eq("id", order_id)
      .single();

    if (!order) return;

    const { data } = await resend.emails.send({
      from: "orders@yourdomain.com",
      to: customer_email,
      subject: `Order Confirmation - ${order_number}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Order Number: <strong>${order_number}</strong></p>
        <p>Total: $${order.total_amount}</p>
        
        <h3>Items Ordered:</h3>
        <ul>
          ${order.order_items
            .map(
              (item) => `
            <li>${item.product_name} - Qty: ${item.quantity} - $${item.line_total}</li>
          `
            )
            .join("")}
        </ul>
        
        <p>Your order will be processed within 1-2 business days.</p>
        <p>Track your order: <a href="${
          process.env.NEXT_PUBLIC_APP_URL
        }/track-order">Track Order</a></p>
      `,
    });

    // Update email sent status
    await supabase
      .from("orders")
      .update({ confirmation_email_sent: true })
      .eq("id", order_id);

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}
```

---

## 🚀 Environment Variables

```env
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend)
RESEND_API_KEY=re_...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📋 Implementation Checklist

### **Phase 1: Database & Core API (Week 1)**

- [ ] Set up Supabase database with guest checkout schema
- [ ] Create all required tables with proper indexes
- [ ] Implement products API with search and filtering
- [ ] Build order creation API with validation
- [ ] Set up guest order tracking API

### **Phase 2: Payment Processing (Week 2)**

- [ ] Integrate Stripe payment processing
- [ ] Create payment intent API endpoints
- [ ] Implement webhook handlers for payment confirmation
- [ ] Test payment flow end-to-end
- [ ] Add proper error handling and logging

### **Phase 3: Email & Communication (Week 3)**

- [ ] Set up Resend email service
- [ ] Create order confirmation email templates
- [ ] Implement shipping notification emails
- [ ] Add email tracking and logging
- [ ] Test email delivery and formatting

### **Phase 4: Security & Performance (Week 4)**

- [ ] Add rate limiting to API endpoints
- [ ] Implement input validation and sanitization
- [ ] Set up proper error tracking (Sentry)
- [ ] Optimize database queries and add indexes
- [ ] Performance testing and optimization

### **Phase 5: Testing & Deployment (Week 5-6)**

- [ ] Write comprehensive API tests
- [ ] E2E testing for complete checkout flow
- [ ] Load testing for payment processing
- [ ] Deploy to Vercel with proper environment variables
- [ ] Set up monitoring and alerting
- [ ] Documentation and handover

---

This clean, production-ready backend plan focuses specifically on guest checkout functionality while maintaining security, performance, and scalability. The architecture is designed to handle real-world e-commerce traffic and provides all the necessary features for a successful guest checkout experience.
