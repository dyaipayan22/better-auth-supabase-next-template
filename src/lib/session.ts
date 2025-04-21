import { headers } from "next/headers"
import "server-only"
import { auth, Session } from "./auth"

export async function getSession(): Promise<Session> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    throw new Error("No session found")
  }
  return session
}
