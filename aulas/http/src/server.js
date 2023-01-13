import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if (url === "/create" && method === "POST") {
        users.push(req.body)
        return res.writeHead(201).end()
    }

    if (url === "/list" && method === "GET") {
        return res.end(JSON.stringify(users))
    }

    return res.writeHead(404).end('Route not founded')
})


server.listen('3333')