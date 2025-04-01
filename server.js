const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Assurez-vous d'avoir installé cette dépendance
const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

app.post('/submit', async (req, res) => {
    try {
        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json',
                'Notion-Version': '2021-08-16',
            },
            body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur côté serveur');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur actif sur http://localhost:${PORT}`);
});