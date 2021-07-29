import { AppError } from '../../../shared/errors/AppError'
import { Product } from '../typeorm/entities/Product'
import { ProductsRepository } from '../typeorm/repository/ProductRepository'
import { getCustomRepository } from 'typeorm'

interface IRequest {
  name: string
  price: string
  quantity: string
}

export class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository)
    const productExists = await productsRepository.findByName(name)
    if (productExists) {
      throw new AppError(
        'Já existe produto cadastrado com o nome informado',
        400,
      )
    }
    const product = productsRepository.create({ name, price, quantity })
    await productsRepository.save(product)
    return product
  }
}
