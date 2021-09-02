import express from 'express'
import bodyParser from 'body-parser'
import order_routes from './handlers/orders'
import product_routes from './handlers/products'
import user_routes from './handlers/users'

const app: express.Application = express()

app.use(bodyParser.json())

product_routes(app)
user_routes(app)
order_routes(app)

const port = process.env.PORT||3000;
app.listen(port, function () {
    console.log(`starting app on :https://127.0.0.1:${port}`)
})

export default app
