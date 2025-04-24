import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import jwt from "jsonwebtoken"
import { getSession } from "@/lib/session"

export async function createClient() {
  const cookieStore = await cookies()
  const currentSession = await getSession()
  
  let token: string;
  if(currentSession){
    token = jwt.sign(
      { uid: currentSession.session.userId },
      process.env.SUPABASE_JWT_SECRET!
    )
  }else{
    token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  }
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
