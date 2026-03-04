'use server'

import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function login(formData: FormData) {
    try {
        await signIn('credentials', { ...Object.fromEntries(formData), redirectTo: '/dashboard' })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials.' }
                default:
                    return { error: 'Something went wrong.' }
            }
        }
        throw error
    }
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('fullName') as string

    if (!email || !password) {
        return { error: "Missing fields" }
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: "Email already in use" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            }
        })

        // Success! We don't sign in here to avoid redirect issues in the signup flow.
        // We'll let the client handle it.
        return { success: true }
    } catch (error) {
        console.error("Signup error:", error)
        return { error: "Failed to create account" }
    }
}

export async function loginWithGoogle() {
    await signIn('google', { redirectTo: '/dashboard' })
}

export async function logout() {
    await signOut({ redirectTo: '/login' })
}
