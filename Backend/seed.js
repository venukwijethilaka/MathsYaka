import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.video.createMany({
    data: [
      {
        title: 'Exploring the Cosmos',
        videoUrl: 'https://www.youtube.com/watch?v=sN9_K1s19mE',
      },
      {
        title: 'The Beauty of Nebulas',
        videoUrl: 'https://www.youtube.com/watch?v=sN9_K1s19mE',
      },
      {
        title: 'Journey to a Black Hole',
        videoUrl: 'https://www.youtube.com/watch?v=sN9_K1s19mE',
      },
      {
        title: 'The Secrets of Dark Matter',
        videoUrl: 'https://www.youtube.com/watch?v=sN9_K1s19mE',
      },
      {
        title: 'Stellar Evolution',
        videoUrl: 'https://www.youtube.com/watch?v=sN9_K1s19mE',
      },
      {
        title: 'The Milky Way Galaxy',
        videoUrl: 'https://www.youtube.com/watch?v=sN9_K1s19mE',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
