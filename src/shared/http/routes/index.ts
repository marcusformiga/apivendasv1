import { Router } from 'express'
import { productRouter } from '../../../modules/products/routes/products.routes'

export const routes = Router()
routes.use('/products', productRouter)
