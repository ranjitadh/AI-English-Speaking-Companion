
import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    console.log('No DATABASE_URL found')
    process.exit(1)
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    try {
        const userCount = await prisma.user.count()
        if (userCount === 0) {
            console.log('No users found in the database. Please Sign Up first.')
        } else {
            const users = await prisma.user.findMany({
                select: { email: true }
            })
            console.log('Existing users:', users.map(u => u.email))
        }
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
