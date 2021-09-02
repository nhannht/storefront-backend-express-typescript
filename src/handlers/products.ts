import express, { NextFunction, Request, Response } from 'express'
import { Product, Inventory } from '../models/product'
import jwt, { Secret } from 'jsonwebtoken'

const inventory = new Inventory()

const index = async (_req:Request,res:Response) => {
    try {
        const products = await inventory.index()
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(products)
    } catch(err) {
        res.status(400).json(err)
    }
}

const show = async (req:Request,res:Response) => {
    try {
        const productById = await inventory.show(req.params.id)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(productById)
    } catch(err) {
        res.status(400).json(err)
    }
}

const create = async (req:Request, res:Response) => {
    const newProduct:Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }

    try {
        const newProductAdded = await inventory.create(newProduct)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(newProductAdded)
    } catch(err) {
        res.status(400).json(err)
    }
}

const listProductsByCategory = async (req: Request, res: Response) => {
    const products = await inventory.productsByCat(req.params.category)
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
    app.get('/products',index)
    app.get('/product/:id',show)
    app.post('/create',verifyUser,create)
    app.get('/products-by-category/:category', listProductsByCategory)
}

export default routes
