import http from 'node:http';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const PORT = 3000;
const filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(filename);

const pagesResolver = async (filename) => {
    const resolvedPath = path.resolve(currentDir, 'pages', filename);
    return await fs.readFile(resolvedPath, 'utf8');
};

const server = http.createServer(async (req, res) => {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        return res.end('Method Not Allowed');
    }

    try {
        if (req.url === '/') {
            const indexPages = await pagesResolver('index.html');
                
            res.setHeader('Content-Type', 'text/html');
            res.end(indexPages);
        } else if (req.url === '/about'){
            const aboutPages = await pagesResolver('about.html');
                
            res.setHeader('Content-Type', 'text/html');
            res.end(aboutPages);
        } else if (req.url === '/contact-me'){
            const contactPages = await pagesResolver('contact-me.html');
                
            res.setHeader('Content-Type', 'text/html');
            res.end(contactPages);
        } else {
            const notFoundPages = await pagesResolver('404.html');
                
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 404;
            res.end(notFoundPages);
        }
    } catch (err) {
        console.log(err);
    }
});

server.listen(PORT, () => console.log(`Running on ${PORT}`));