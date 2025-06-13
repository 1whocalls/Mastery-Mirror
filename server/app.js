import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(cors({
    origin: process.env.SITE_URL
}));

app.get('/acount/:region/:gamename/:tagline', async (req, res) => {
    const fetchResponse = await fetch(`https://${req.params.region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${req.params.gamename}/${req.params.tagline}?api_key=${process.env.API_KEY}`);

    if (fetchResponse.ok) {
        res.json(await fetchResponse.text());
    } else {
        res.status(404).send("Not found.");
    }
});

app.listen(port);
