import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (url === "/create" && method === "POST") {
        users.push({
            id: '1',
            name: 'Thiago',
            email: 'customer@test.com.br',
        })

        return res.writeHead(201).end()
    }

    if (url === "/list" && method === "GET") {
        return res
            .setHeader('Content-type', 'application/json')
            // .setHeader('Custom', 'thiago')
            .end(JSON.stringify(users))
    }

    return res.writeHead(404).end('Route not founded')
})


server.listen('3333')