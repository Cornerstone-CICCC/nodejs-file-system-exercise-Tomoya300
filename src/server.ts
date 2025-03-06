// Check the README.md file for instructions to the exercise
import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'
import dotenv from 'dotenv'
dotenv.config()

const imagePath = path.join(__dirname, '../dist/images/veryhappydog.jpg')

const server = http.createServer((req, res) => {

    const { method } = req
    const parsedUrl = url.parse(req.url || '', true)
    const { pathname } = parsedUrl
    
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Welcome to the server!')
        return
    }

    if (pathname === '/view-image' && method === 'GET') {
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'content-type': 'text/plain'})
                res.end('Error reading image')
            }

            res.writeHead(200, { 'content-type': 'image/jpeg'})
            console.log('happy dog showing up!')
            res.end(data)
        })
        return 
    }

    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not found')
    return
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})