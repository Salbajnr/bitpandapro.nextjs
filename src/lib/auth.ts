import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import prisma from "./prisma";

export async function getSupabaseUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
  return user ?? null;
}

// Ensure we have a corresponding row in our Prisma User table for this Supabase auth user
export async function ensurePrismaUser(user: User) {
  const email = user.email ?? `${user.id}@noemail.local`;
  const name = (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || null;
  await prisma.user.upsert({
    where: { id: user.id },
    update: { email, name: name ?? undefined },
    create: { id: user.id, email, name },
  });
}