import http from 'node:http'
import { Transform } from 'node:stream'

// class InverseNumberStream extends Transform {
//     _transform(chunk, encoding, callback) {
//         const transformed = Number(chunk.toString()) * -1

//         console.log(transformed)

//         callback(null, Buffer.from(String(transformed)))
//     }
// }


const server = http.createServer(async (req, res) => {
    const buffers = []

    // const { body } = req

    console.log(req.body)

    for await (const chunk of req) {
        console.log('Este é o chunk >>> ' + chunk)
        buffers.push(chunk)
    }

    const fullContentStream = Buffer.concat(buffers).toString()

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)

    return res.end(fullContentStream)
})

server.listen(3334)