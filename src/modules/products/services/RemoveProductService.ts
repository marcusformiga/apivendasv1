import { AppError } from '../../../shared/errors/AppError'
import { Product } from '../typeorm/entities/Product'
import { ProductsRepository } from '../typeorm/repository/ProductRepository'
import { getCustomRepository } from 'typeorm'

export class RemoveProductService {
  public async execute(id: string): Promise<string> {
    const productRepository = getCustomRepository(ProductsRepository)
    const product = await productRepository.findById(id)
    if (!product) {
      throw new AppError(
        `Produto com id ${id} não encontrado, portanto não pode ser deletado`,
        404,
      )
    }
    return id
  }
}
