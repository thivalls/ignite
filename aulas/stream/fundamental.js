import { stdout } from 'node:process';
import { Readable, Writable, Transform } from 'node:stream'

// read stream
class OneToHandredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++

        setTimeout(() => {

            if (i > 100) {
                this.push(null)
            } else {
                let buf = Buffer.from(String(i))
                this.push(buf)
            }

        }, 500)

    }
}

// transformation stream
class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

// write stream
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHandredStream()
    .pipe(new InverseNumber())
    .pipe(new MultiplyByTenStream())