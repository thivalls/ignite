import fs from 'node:fs/promises'

const databaseFilePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databaseFilePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databaseFilePath, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []
        return data
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
    }

    delete(table, id) {
        if(Array.isArray(this.#database[table])) {
            const index = this.#database[table].indexOf(this.#database[table].find(item => item.id === id))
            this.#database[table].splice(index, 1);
            this.#persist()
        } else {
            return;
        }
    }

    find(table, id) {
        if(Array.isArray(this.#database[table])) {
            return this.#database[table].find(item => item.id === id)
        } else {
            return;
        }
    }
}