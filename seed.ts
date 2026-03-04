import 'dotenv/config'
import prisma from './lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10)

    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
        },
    })

    console.log('User created:', user.email)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
