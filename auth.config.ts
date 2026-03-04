import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }
            return session
        }
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig
