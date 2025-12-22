import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import prisma from "./prisma";

// Load environment variables
require('dotenv/config');

export async function getSupabaseUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables are not set');
    return null;
  }
  
  const cookieStore = await cookies();
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Handle cookie setting errors
          }
        },
        remove(name, options) {
          try {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  // Ensure the user exists in our Prisma database
  if (user) {
    // Check if user's email is verified
    if (!user.email_confirmed_at) {
      console.log('User email not verified:', user.email);
      return null; // Return null for unverified users
    }
    
    try {
      await ensurePrismaUser(user);
    } catch (error) {
      console.error('Failed to ensure Prisma user:', error);
      // We still return the Supabase user even if Prisma sync fails
    }
  }
  
  return user ?? null;
}

// Ensure we have a corresponding row in our Prisma User table for this Supabase auth user
export async function ensurePrismaUser(user: User) {
  try {
    const email = user.email ?? `${user.id}@noemail.local`;
    const name = (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || null;
    const prismaUser = await prisma.user.upsert({
      where: { id: user.id },
      update: { email, name: name ?? undefined },
      create: { id: user.id, email, name },
    });
    return prismaUser;
  } catch (error) {
    console.error('Error ensuring Prisma user:', error);
    throw new Error('Failed to synchronize user data');
  }
}