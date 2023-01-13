import http from 'node:http'

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {    
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    if (url === "/create" && method === "POST") {
        users.push(req.body)
        return res.writeHead(201).end()
    }

    if (url === "/list" && method === "GET") {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    return res.writeHead(404).end('Route not founded')
})


server.listen('3333')