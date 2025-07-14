import { AutoRouter, cors, json, error } from 'itty-router';
import { fetcher } from 'itty-fetcher'
import 'dotenv/config';

const { preflight, corsify } = cors()

const router = AutoRouter({
    before: [preflight],   // Handles OPTIONS requests
    finally: [corsify],    // Adds CORS headers to responses
})

router.get('/account/:region/:gamename/:tagline', async (request, env) => {
    try {
        const fetchResponse = await fetcher().get(`https://${request.params.region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${request.params.gamename}/${request.params.tagline}?api_key=${env.API_KEY}`);
        return json(fetchResponse);
    } catch (err) {
        return error(err.status.status_code, err.status.message);
    }
});

router.get('/iconcode/:region/:puuid', async (request, env) => {
    try {
        const fetchResponse = await fetcher().get(`https://${request.params.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${request.params.puuid}?api_key=${env.API_KEY}`);
        return json(fetchResponse);
    } catch (err) {
        return error(err);
    }
});

export default router;
