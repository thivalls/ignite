import { stdout } from 'node:process';
import { Readable } from 'node:stream'

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

new OneToHandredStream()
    .pipe(process.stdout)