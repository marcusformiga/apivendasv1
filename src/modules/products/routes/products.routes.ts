import { Router } from 'express'
import { ProductController } from '../controllers/ProductControllers'

export const productRouter = Router()
const productController = new ProductController()

productRouter.get('/', productController.listAll)
productRouter.post('/', productController.create)
productRouter.get('/:id', productController.listOne)
productRouter.put('/:id', productController.update)
productRouter.delete('/:id', productController.remove)
