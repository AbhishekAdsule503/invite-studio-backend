import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const getSupabaseCredentials = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
};

export const createClient = (request: NextRequest) => {
  const { url, key } = getSupabaseCredentials();

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) are required to create a Supabase client."
    );
  }

  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  return { supabase, supabaseResponse };
};

export const updateSession = (request: NextRequest) => {
  const { url, key } = getSupabaseCredentials();

  // If Supabase credentials are not configured, safely pass through without crashing.
  // The primary app authentication uses Prisma and custom JWT sessions.
  if (!url || !key) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  try {
    const { supabaseResponse } = createClient(request);
    return supabaseResponse;
  } catch (error) {
    console.warn("Supabase updateSession bypassed due to error:", error);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

