const express = require('express')
const axios = require('axios')
const { LRUCache } = require('lru-cache')
const cors = require('cors')
const { program } = require('commander')


let server = null;
let cache = null;

const startServer = (port, endUrl) => {
    const app = express()
    app.use(cors())

    cache = new LRUCache({
        max: 100,
        ttl: 1000 * 60 * 5
    })

    app.get("/*", async (req, res) => {
        const endpoint = req.originalUrl;
        const cacheKey = endpoint;

        if (cache.has(cacheKey)) {
            console.log('Cached response from:', cacheKey);
            console.log("\n");
            return res.json(cache.get(cacheKey))
        }

        try {
            console.log(`Fetching from API: ${endUrl}${endpoint}`);
            const response = await axios.get(`${endUrl}${endpoint}`);
            const data = response.data;
            cache.set(cacheKey, data);
            console.log("\n");
            res.json(data);
        } catch (error) {
            console.log("\n");
            res.status(error.response?.status || 500).json({ error: "Failed to fetch data" });
        }
    })

    server = app.listen(port, () => {
        console.log(`Proxy Server running at http://localhost:${port}`);
        console.log(`Proxying requests to: ${endUrl}`);
    })
}

const stopServer = () => {
    if (server) {
        server.close(() => {
            if (cache) {
                cache.clear()
                console.log('Cache cleared')
            }

            process.exit(0)
        })
    } else {
        console.log('Server not found.')
        process.exit(0)
    }
}

process.on("SIGINT", stopServer);
process.on("SIGTERM", stopServer);


program
    .command('start')
    .description('Start proxy server')
    .option('--port <number>', "Port", 4000)
    .option('--api <url>', 'Api Url', 'https://jsonplaceholder.typicode.com')
    .action((options) => {
        const { port, api } = options;
        startServer(port, api)
    })

program
    .command('close')
    .description('Close server')
    .action(() => {
        stopServer()
    })


program.parse();