import { randomUUID } from 'node:crypto';
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const user = database.find('users', req.params.id)
            if (!user) return res.writeHead(404).end()
            return res.end(JSON.stringify(user))
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email
            }

            database.insert('users', user)
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            database.delete('users', req.params.id)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { name, email } = req.body
            const data = {
                name,
                email
            }
            database.update('users', req.params.id, data)
            return res.writeHead(204).end()
        }
    },
]