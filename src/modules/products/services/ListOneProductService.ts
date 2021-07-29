import { AppError } from '../../../shared/errors/AppError'
import { Product } from '../typeorm/entities/Product'
import { ProductsRepository } from '../typeorm/repository/ProductRepository'
import { getCustomRepository } from 'typeorm'

export class ListOneProductService {
  public async execute(id: string): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductsRepository)
    const product = await productRepository.findById(id)
    if (!product) {
      throw new AppError(`Produto com id ${product} não foi encontrado`, 404)
    }
    return product
  }
}
