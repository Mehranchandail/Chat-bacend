const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(cors());

const ONESIGNAL_APP_ID = 'ac0d7a63-cacc-476b-bb9b-35ad9eab5ed7';
const ONESIGNAL_API_KEY = 'os_v2_app_vqgxuy6kzrdwxo43gwwz5k26246jyhzgjbye37fsmm7ocovegzaw6ja7oopvdbpvy4d66aof3zqypux2frd3tycs774vqyq7xwposfy';

app.post('/api/notification', async (req, res) => {
    const { playerId, title, message } = req.body;

    const notification = {
        app_id: ONESIGNAL_APP_ID,
        include_player_ids: [playerId],
        headings: { "en": title },
        contents: { "en": message },
        url: url
    };

    try {
        const response = await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${ONESIGNAL_API_KEY}`
            },
            body: JSON.stringify(notification)
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
