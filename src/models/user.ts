import database from '../database'
import bcrypt from 'bcrypt'

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string
}

export class UserList {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users'

            const conn = await database.connect()
            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch(err) {
            throw new Error(`Could not get users: ${err}`)
        }
    }

    async show(id:string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'

            const conn = await database.connect()
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows[0]
        } catch(err) {
            throw new Error(`Could not find user with id ${id}: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *'
            const saltRounds = (process.env.SALT_ROUNDS as unknown) as string
            console.log(saltRounds);
            const pepper = process.env.BCRYPT_PASSWORD
            console.log(pepper);
            const hash = bcrypt.hashSync(u.password + pepper,parseInt(saltRounds))
            console.log(hash);
            const conn = await database.connect()
            const result = await conn.query(sql,[u.first_name, u.last_name, hash])
            const newUser = result.rows[0]
            conn.release()

            return newUser
        } catch(err) {
            throw new Error(`Could not create new user: ${err}`)
        }
    }

    async authenticate (firstName: string, password: string): Promise<User | null> {
        const sql = 'SELECT password FROM users WHERE first_name=($1)'
        const pepper = process.env.BCRYPT_PASSWORD

        const conn = await database.connect()
        const result = await conn.query(sql,[firstName])

        if (result.rows.length) {
            const user = result.rows[0]
            if(bcrypt.compareSync(password + pepper, user.password)) {
                return user
            }
        }

        return null
    }
}
