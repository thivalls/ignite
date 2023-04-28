import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

const p1 = '1529353'
const p2 = '71134637'

const url =
  'https://www.hackerrank.com/x/api/v3/tests/' +
  p1 +
  '/candidates/' +
  p2 +
  '/pdf?format=url'

const hrApiResponse = fetch(url, {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer 2b76f4eabb8096fdf2844c96db50f1da575a9a31776a0c3a6cac3a7672c75fa6',
    Accept: 'application/json',
  },
})

console.log(hrApiResponse)

app.get('/hello', async () => {
  const result = await knex('sqlite_schema').select('*')
  return result
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('server running')
  })
