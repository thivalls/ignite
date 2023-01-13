import http from 'node:http'
import { Database } from './database/database.js'
import { json } from './middlewares/json.js'

const database = new Database();

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    const users = database.select('users')

    await json(req, res)

    if (url === "/create" && method === "POST") {
        database.insert('users', req.body)
        return res.writeHead(201).end()
    }

    if (url === "/list" && method === "GET") {
        return res.end(JSON.stringify(users))
    }

    return res.writeHead(404).end('Route not founded')
})


server.listen('3333')