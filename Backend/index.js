import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';  // Import the adapter
import pg from 'pg';                            // Import the standard PG driver
import 'dotenv/config';                         // Load environment variables

const { Pool } = pg;
const app = express();
const port = 3000;

app.use(cors());

// 1. Create a PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// 2. Create the adapter using that pool
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to PrismaClient
const prisma = new PrismaClient({ adapter });

app.use(express.json());


// Note the 'async' keyword here
app.get('/get_all_video', async (req, res) => {
    try {
        const videos = await prisma.video.findMany();
        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});



app.post('/add_video', async (req, res) => {
    const { title, videoUrl, videoLink, createdAt} = req.body;

    if (!title || !videoUrl || !videoLink) {
      return res.status(400).json({ error: "title, videoUrl and videoLink are required" });
    }

    try {
        const video = await prisma.video.create({
            data: {
                title,
                videoUrl,
                videoLink,
                createdAt: createdAt ? new Date(createdAt) : new Date(),
            },
        });

        res.status(201).json(video);
    } catch (error) {
        console.error(error); // Log the error to terminal so you can see it
        res.status(500).json({ error: 'Failed to create video' });
    }
});



app.get('/search_video/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const video = await prisma.video.findFirst({
            where: { title },
        });

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json(video); // Send the found video as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch the video' });
    }
});


app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const video = await prisma.video.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({
            message: 'Video deleted successfully',
            video,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Video not found or already deleted' });
    }
});




// '0.0.0.0' tells Node to accept connections from Docker/Windows
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});