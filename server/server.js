const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();

const backendServerURI = process.env.BACKEND_SERVER_URI;

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());

    /** Proxy image requests, which is good practice when using HTTPS. */
    server.use('/content/images/*', proxy(backendServerURI, {
        forwardPath: (req, res) => {
            console.debug(`Forward request ${req.originalUrl} to backend ${backendServerURI}${req.originalUrl}`);
            return req.originalUrl;
        }
    }));

    server.get('/health', (req, res) => {
        res.send();
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Server ready on http://localhost:3000');
    });
});