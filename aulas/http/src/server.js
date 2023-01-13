
import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)
        if(routeParams.groups) {
            if(routeParams.groups.id) req.id = routeParams.groups.id
        }
        return route.handler(req, res)
    }

    return res.writeHead(404).end('Route not founded')
})


server.listen('3333')