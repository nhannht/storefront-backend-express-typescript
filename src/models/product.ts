import database from '../database'

export type Product = {
    id?: number,
    name: string,
    price: number,
    category: string
}

export class Inventory {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products'

            const conn = await database.connect()
            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch(err) {
            throw new Error(`Could not get products: ${err}`)
        }
    }

    async show(id:string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'

            const conn = await database.connect()
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows[0]
        } catch(err) {
            throw new Error(`Could not get product with id ${id}: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'

            const conn = await database.connect()
            const result = await conn.query(sql,[p.name, p.price, p.category])
            const product = result.rows[0]
            conn.release()

            return product
        } catch(err) {
            throw new Error(`Could not create new product: ${err}`)
        }
    }

    // Get all products under specific category
    async productsByCat(category: string): Promise<Product[]> {
        try {
        const conn = await database.connect()
        const sql = 'SELECT * FROM products WHERE products.category=($1)'

        const result = await conn.query(sql,[category])

        conn.release()

        return result.rows
        } catch (err) {
        throw new Error(`unable get any products under category ${category}: ${err}`)
        }
    }
}
