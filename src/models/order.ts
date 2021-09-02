import database from '../database'

export type Order = {
    id?: number,
    status: string,
    user_id: number,
}

export type OrderedProduct = {
    id?: number,
    quantity: number,
    product_id: number,
    order_id: number,
}

export class Orders {
    async selectOrdersByUser(id:string): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'

            const conn = await database.connect()
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows
        } catch(err) {
            throw new Error(`Could not find any order for user with id ${id}: ${err}`)
        }
    }

    async selectFinishedOrdersByUser(id:string): Promise<Order[]> {
        try {

            const conn = await database.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
            const result = await conn.query(sql,[id,"complete"])

            conn.release()

            return result.rows
        } catch(err) {
            throw new Error(`Could not find any complete order for user with id ${id}: ${err}`)
        }
    }

    async createOrder(order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'
            //@ts-ignore
            const conn = await database.connect()

            const result:any = await conn
                .query(sql, [order.status, order.user_id])

            const firstRowOfResult = result.rows[0]

            conn.release()

            return firstRowOfResult
        } catch (err) {
            throw new Error(`Could not add new order: ${err}`)
        }
    }

    async insertProduct(orderedProduct: OrderedProduct): Promise<OrderedProduct> {
        //add products to an existing order
        try {
            const sql = 'INSERT INTO order_product (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const conn = await database.connect()

            const result = await conn.query(sql, [orderedProduct.quantity, orderedProduct.order_id, orderedProduct.product_id])

            conn.release()

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add product ${orderedProduct.product_id} to order ${orderedProduct.order_id}: ${err}`)
        }
    }

    async selectFiveMostPopularProducts(): Promise<{name: string, price: number, ordered_quantity: number}[]> {
        try {
          const conn = await database.connect()
          const sql = 'SELECT name, price, SUM(order_product.quantity)::int as ordered_quantity FROM products INNER JOIN order_product ON products.id = order_product.product_id GROUP BY products.id ORDER BY ordered_quantity DESC LIMIT 5'

          const result = await conn.query(sql)

          conn.release()

          return result.rows
        } catch (err) {
          throw new Error(`something wrong: ${err}`)
        }
      }

}
