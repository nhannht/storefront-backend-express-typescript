import express, { NextFunction, Request, Response } from 'express'
import { Order, OrderedProduct, Orders } from '../models/order'
import jwt, { Secret } from 'jsonwebtoken'

const orders = new Orders()

const listAllOrderByUser = async (req:Request,res:Response) => {
    try {
        const ordersByUser = await orders.selectOrdersByUser(req.params.id)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(ordersByUser)
    } catch(err) {
        res.status(400).json(err)
    }
}
const listAllCompleteOrdersByUser = async (req:Request,res:Response) => {
    try {
        const completeOrdersByUser = await orders.selectFinishedOrdersByUser(req.params.id)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(completeOrdersByUser)
    } catch(err) {
        res.status(400).json(err)
    }
}
const createNewOrder = async (req:Request,res:Response) => {
    const newItem: Order = {
        status: req.body.status,
        user_id: req.body.userId
    }

    try {
        const newOrder = await orders.createOrder(newItem)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(newOrder)
    } catch(err) {
        res.status(400).json(err)
    }
}

const addNewProduct = async (req:Request,res:Response) => {
    const newItem: OrderedProduct = {
        quantity: req.body.quantity,
        product_id: req.body.productId,
        order_id: req.body.orderId
    }

    try {
        const addedProd = await orders.insertProduct(newItem)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(addedProd)
    } catch(err) {
        res.status(400).json(err)
    }
}

const listMostFivePopularProduct = async (_req: Request, res: Response) => {
    const products = await orders.selectFiveMostPopularProducts()
    // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
    return res.json(products)
}

const verifyUser = async (req:Request, res:Response, next: NextFunction) => {
    const TOKEN_SECRET = (process.env.TOKEN_SECRET as unknown) as Secret
    try {
        const authorizationHeader = (req.headers.authorization as unknown) as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token,TOKEN_SECRET)
    } catch(err) {
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.status(401).json(err)
    }
    next()
}

const routes = (app:express.Application) => {
    app.get('/order/user/:id',verifyUser,listAllOrderByUser)
    app.get('/order/complete/user/:id',verifyUser,listAllCompleteOrdersByUser)
    app.post('/order/create',verifyUser,createNewOrder)
    app.post('/order/add-product',verifyUser,addNewProduct)
    app.get('/top-five-products', listMostFivePopularProduct)
}

export default routes
