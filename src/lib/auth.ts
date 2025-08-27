import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const validatedFields = loginSchema.safeParse(credentials)
          if (!validatedFields.success) return null

          const { email, password } = validatedFields.data
          
          const user = await prisma.user.findUnique({
            where: { email }
          })

          if (!user || !user.password) return null

          // Check account lockout
          if (user.isLocked && user.lockedUntil && user.lockedUntil > new Date()) {
            throw new Error("Account is locked due to too many failed login attempts")
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            // Increment failed login attempts
            await prisma.user.update({
              where: { id: user.id },
              data: {
                failedLoginAttempts: user.failedLoginAttempts + 1,
                lastLoginAttempt: new Date(),
                // Lock after 5 failed attempts for 15 minutes
                ...(user.failedLoginAttempts >= 4 && {
                  isLocked: true,
                  lockedUntil: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
                })
              }
            })
            return null
          }

          // Reset failed login attempts on successful login
          if (user.failedLoginAttempts > 0) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                failedLoginAttempts: 0,
                isLocked: false,
                lockedUntil: null
              }
            })
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            plan: user.plan
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.plan = user.plan
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.plan = token.plan as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  }
})