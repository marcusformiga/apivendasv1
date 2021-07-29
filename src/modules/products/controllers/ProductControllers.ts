/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import { CreateProductService } from '../services/CreateProductService'
import { ListProductsService } from '../services/ListProductsService'
import { ListOneProductService } from '../services/ListOneProductService'
import { RemoveProductService } from '../services/RemoveProductService'
import { UpdateProductService } from '../services/UpdateProductService'

export class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const createProduct = new CreateProductService()
    const product = await createProduct.execute({ name, price, quantity })
    return response.json(product).status(201)
  }
  // eslint-disable-next-line prettier/prettier
  public async listAll(request: Request, response: Response): Promise<Response>{
    const listProduct = new ListProductsService()
    const products = await listProduct.execute()
    return response.json(products)
  }
  public async listOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const listProduct = new ListOneProductService()
    const product = await listProduct.execute(id)
    return response.json(product)
  }
  public async update(request: Request, response: Response): Promise<Response>{
    const { id } = request.params
    const {name, price, quantity} = request.body
    const updateProduct = new UpdateProductService()
    const product = await updateProduct.execute({ id, name, price, quantity })
    return response.json(product)

  }
  public async remove(request: Request, response: Response): Promise<Response>{
    const { id } = request.params
    const removeProduct = new RemoveProductService()
    const product = await removeProduct.execute(id)
    return response.json({id: id})
  }
}

