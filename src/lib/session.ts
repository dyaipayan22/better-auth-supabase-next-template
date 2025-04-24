import "server-only"
import { headers } from "next/headers"
import { auth, Session } from "./auth"

export async function getSession(): Promise<Session|null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}
