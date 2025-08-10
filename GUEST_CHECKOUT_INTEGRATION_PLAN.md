# Guest Checkout Backend Integration Plan

## 📋 Project Overview

This Next.js e-commerce platform is designed for **guest checkout only** - customers can browse, shop, and purchase without creating accounts. This simplifies the user experience and reduces friction in the purchasing process.

## 🛒 Current Status (Mock Data)

- ✅ Complete shopping cart system with localStorage persistence
- ✅ Guest checkout flow with shipping and payment forms
- ✅ Order confirmation page
- ✅ Responsive design and UI components
- ✅ Product catalog with categories and individual product pages

## 🗄️ Database Schema Design

### Core Tables Needed:

1. **products** - Product catalog
2. **categories** - Product categories
3. **orders** - Guest orders (no user accounts)
4. **order_items** - Items within each order

### Products Table:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category_id INTEGER REFERENCES categories(id),
  brand VARCHAR(100),
  images JSON, -- Array of image URLs
  features JSON, -- Array of feature strings
  specifications JSON, -- Key-value pairs
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Categories Table:

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Orders Table (Guest Orders):

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., "ORD-2024-001234"

  -- Customer Information (no account needed)
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),

  -- Shipping Address
  shipping_first_name VARCHAR(100) NOT NULL,
  shipping_last_name VARCHAR(100) NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city VARCHAR(100) NOT NULL,
  shipping_state VARCHAR(100) NOT NULL,
  shipping_zip_code VARCHAR(20) NOT NULL,
  shipping_country VARCHAR(100) DEFAULT 'United States',

  -- Order Totals
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,

  -- Payment & Status
  payment_method VARCHAR(50), -- 'card', 'paypal'
  payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  order_status VARCHAR(50) DEFAULT 'processing', -- 'processing', 'shipped', 'delivered'

  -- Tracking
  tracking_number VARCHAR(100),

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Order Items Table:

```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),

  -- Product snapshot (in case product details change)
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  product_image VARCHAR(500),

  quantity INTEGER NOT NULL DEFAULT 1,
  item_total DECIMAL(10,2) NOT NULL, -- price * quantity

  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔗 API Routes to Implement

### Products API:

- `GET /api/products` - Get all products with pagination
- `GET /api/products/[id]` - Get single product
- `GET /api/categories` - Get all categories
- `GET /api/categories/[slug]` - Get products by category

### Orders API:

- `POST /api/orders` - Create new guest order
- `GET /api/orders/[orderNumber]` - Get order by order number (for tracking)
- `PUT /api/orders/[id]/status` - Update order status (admin)

### Example Order Creation:

```typescript
// /api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const orderData = await request.json();

  // Validate order data
  // Process payment
  // Create order in database
  // Send confirmation email
  // Return order confirmation

  return NextResponse.json({
    success: true,
    orderNumber: "ORD-2024-001234",
    message: "Order created successfully",
  });
}
```

## 💳 Payment Processing

### Recommended: Stripe Integration

1. Create Stripe account and get API keys
2. Install Stripe SDK: `npm install @stripe/stripe-js stripe`
3. Create checkout sessions for guest orders
4. Handle webhooks for payment confirmation
5. Store order records in database

### Guest Payment Flow:

1. User fills checkout form → Validate data
2. Create Stripe checkout session with customer email
3. Redirect to Stripe checkout page
4. After payment → Stripe webhook confirms payment
5. Create order in database with customer info
6. Send order confirmation email
7. Redirect to order confirmation page

### Stripe Checkout Implementation:

```typescript
// /api/checkout/route.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { items, customerInfo } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customerInfo.email,
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    metadata: {
      customerInfo: JSON.stringify(customerInfo),
    },
  });

  return NextResponse.json({ sessionId: session.id });
}
```

## 📧 Email Integration

### Order Confirmation Emails:

Since users don't have accounts, email becomes the primary communication method:

- Order confirmation with order number and details
- Shipping notifications with tracking information
- Delivery confirmation

### Recommended: Resend or SendGrid

```typescript
// /lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: Order) {
  await resend.emails.send({
    from: "orders@yourdomain.com",
    to: order.customer_email,
    subject: `Order Confirmation - ${order.order_number}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Order Number: ${order.order_number}</p>
      <p>Total: $${order.total_amount}</p>
      <!-- Order details template -->
    `,
  });
}
```

## 🚀 Migration Steps

### Phase 1: Database Setup

1. Set up Supabase project
2. Create tables with SQL schema above
3. Seed with product data
4. Set up Row Level Security (public read for products, admin write)

### Phase 2: API Implementation

1. Replace mock data with real API calls
2. Implement product fetching from database
3. Create order creation endpoint
4. Add payment processing with Stripe

### Phase 3: Order Management

1. Create admin panel for order management
2. Implement order status updates
3. Add email notifications
4. Create order tracking by email/order number

### Phase 4: Production Setup

1. Configure environment variables
2. Set up Stripe webhooks
3. Configure email service
4. Deploy to production

## 🔧 Environment Variables Needed

```env
# Database
DATABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_URL=https://yourdomain.com
```

## 📊 Order Tracking for Guests

Since there are no user accounts, implement order tracking via:

1. **Order Number + Email**: Customers enter order number and email to track
2. **Magic Links**: Send trackable links in emails
3. **SMS Updates**: Optional SMS notifications with tracking links

### Order Tracking Page:

```typescript
// /app/track-order/page.tsx
export default function TrackOrderPage() {
  return (
    <div>
      <h1>Track Your Order</h1>
      <form>
        <input placeholder="Order Number" />
        <input placeholder="Email Address" />
        <button>Track Order</button>
      </form>
    </div>
  );
}
```

## 🎯 Benefits of Guest-Only Approach

1. **Reduced Friction**: No account creation barriers
2. **Faster Checkout**: Streamlined purchasing process
3. **Lower Maintenance**: No user management complexity
4. **Privacy Focused**: Minimal data collection
5. **Mobile Optimized**: Quick purchases on mobile devices

## 🔒 Security Considerations

1. **Rate Limiting**: Prevent abuse of order creation
2. **Input Validation**: Validate all customer inputs
3. **Email Verification**: Optional email verification for orders
4. **Payment Security**: PCI compliance through Stripe
5. **Data Protection**: Secure handling of customer information

This approach provides a clean, simple e-commerce experience focused on converting visitors into customers quickly and efficiently.
