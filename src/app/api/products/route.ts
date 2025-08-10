import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { apiRateLimit, getClientId } from "@/lib/rate-limit";

// Input validation schema
interface ProductQueryParams {
  category?: string;
  search?: string;
  limit: number;
  offset: number;
}

function validateAndSanitizeParams(
  searchParams: URLSearchParams
): ProductQueryParams {
  // Sanitize and validate category parameter
  const category = searchParams.get("category")?.trim().toLowerCase();
  const validatedCategory =
    category && category.length <= 50 ? category : undefined;

  // Sanitize and validate search parameter
  const search = searchParams.get("search")?.trim();
  const validatedSearch =
    search && search.length <= 100
      ? search.replace(/[<>]/g, "") // Basic XSS prevention
      : undefined;

  // Validate numeric parameters with safe limits
  const limitParam = searchParams.get("limit");
  const offsetParam = searchParams.get("offset");

  const limit = limitParam
    ? Math.min(Math.max(parseInt(limitParam), 1), 100) // Limit between 1-100
    : 20;

  const offset = offsetParam
    ? Math.max(parseInt(offsetParam), 0) // Non-negative offset
    : 0;

  return {
    category: validatedCategory,
    search: validatedSearch,
    limit,
    offset,
  };
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting check
    const clientId = getClientId(request);
    const rateCheck = apiRateLimit.check(request, 30, clientId); // 30 requests per minute per IP

    if (!rateCheck.success) {
      console.warn(`Rate limit exceeded for IP: ${clientId}`);
      return NextResponse.json(
        {
          error: "Too many requests",
          message: "Please wait before making more requests",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateCheck.limit.toString(),
            "X-RateLimit-Remaining": rateCheck.remaining.toString(),
            "X-RateLimit-Reset": rateCheck.reset.toISOString(),
          },
        }
      );
    }

    // Validate and sanitize input parameters
    const { searchParams } = new URL(request.url);
    const params = validateAndSanitizeParams(searchParams);
    const { category, search, limit, offset } = params;

    const supabase = createServerClient();

    let query = supabase
      .from("products")
      .select(
        `
        *,
        brand:brands(*),
        category:categories(*),
        images:product_images(*),
        reviews:product_reviews(rating)
      `
      )
      .eq("is_active", true)
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq("category.slug", category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%, description.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    // Process data to include calculated fields
    const processedData =
      data?.map((product) => {
        const ratings = product.reviews || [];
        const avgRating =
          ratings.length > 0
            ? ratings.reduce(
                (sum: number, review: { rating: number }) =>
                  sum + review.rating,
                0
              ) / ratings.length
            : 0;

        return {
          ...product,
          rating: Math.round(avgRating * 10) / 10,
          reviewCount: ratings.length,
          image: product.images?.[0]?.image_url || "/placeholder.jpg",
        };
      }) || [];

    return NextResponse.json({
      products: processedData,
      count: processedData.length,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  }
}
