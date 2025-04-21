import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { Pool } from "pg"

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL as string,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 15,
    resetPasswordTokenExpiresIn: 60 * 60,
  },
  emailVerification: {
    sendOnSignUp: process.env.NODE_ENV === "production",
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  secret: process.env.BETTER_AUTH_SECRET,
})

export type Session = typeof auth.$Infer.Session
