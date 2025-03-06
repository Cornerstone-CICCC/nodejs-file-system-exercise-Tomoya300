"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Check the README.md file for instructions to the exercise
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const imagePath = path_1.default.join(__dirname, '../dist/images/veryhappydog.jpg');
const server = http_1.default.createServer((req, res) => {
    const { method } = req;
    const parsedUrl = url_1.default.parse(req.url || '', true);
    const { pathname } = parsedUrl;
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the server!');
        return;
    }
    if (pathname === '/view-image' && method === 'GET') {
        fs_1.default.readFile(imagePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'content-type': 'text/plain' });
                res.end('Error reading image');
            }
            res.writeHead(200, { 'content-type': 'image/jpeg' });
            console.log('happy dog showing up!');
            res.end(data);
        });
        return;
    }
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
    return;
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
