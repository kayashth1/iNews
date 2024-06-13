// app.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(join(__dirname, 'public')));

app.get('/news', async (req, res) => {
    const query = req.query.q || 'India';
    try {
        const response = await fetch(`${process.env.API_URL}?q=${query}&apiKey=${process.env.API_KEY}`);
        const data = await response.json();
        res.json(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
