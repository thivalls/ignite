import { randomUUID } from 'node:crypto';
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const task = database.find('tasks', req.params.id)
            if (!task) return res.writeHead(404).end()
            return res.end(JSON.stringify(task))
        }
    },
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            let tasks = []
            const { search } = req.query

            if (search) {
                tasks = database.select('tasks', {
                    title: search,
                    description: search
                })
            } else {
                tasks = database.select('tasks')
            }

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at : null,
                created_at : new Date().toJSON(),
                updated_at : new Date().toJSON(),
            }

            database.insert('tasks', task)
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            database.delete('tasks', req.params.id)
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { title, description } = req.body
            let original = database.find('tasks', req.params.id)
            
            if(original) {
                const data = {
                    title : title || original.title,
                    description : description || original.description,
                    created_at : original.created_at,
                    completed_at : original.completed_at,
                    updated_at : new Date().toJSON()
                }
                database.update('tasks', req.params.id, data)
                return res.writeHead(204).end()
            }

            return res.writeHead(404).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const original = database.find('tasks', req.params.id)

            if(original) {
                const data = { 
                    title : original.title,
                    description: original.description,
                    created_at: original.created_at,
                    updated_at: new Date().toJSON(),
                    completed_at : original.completed_at ? null : new Date().toJSON()
                }
                database.update('tasks', req.params.id, data)
                return res.writeHead(204).end()
            }

            return res.writeHead(404).end()
        }
    },
]