import { Readable, Duplex } from 'node:stream'

// read stream
class OneToHandredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++

        setTimeout(() => {

            if (i > 10) {
                this.push(null)
            } else {
                let buf = Buffer.from(String(i))
                this.push(buf)
            }

        }, 1000)

    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHandredStream(),
    duplex: 'half',
})