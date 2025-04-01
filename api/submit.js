const fetch = require('node-fetch'); // Importation de node-fetch

module.exports = async (req, res) => {
    if (req.method === 'POST') {
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
    } else {
        res.status(405).send('Méthode non autorisée'); // Gérer les méthodes autres que POST
    }
};