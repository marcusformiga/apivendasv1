import { AppError } from "../../../shared/errors/AppError"
import { Product } from "../typeorm/entities/Product"
import { ProductsRepository } from "../typeorm/repository/ProductRepository"
import { getCustomRepository } from "typeorm"

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}
export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductsRepository)
    const product = await productRepository.findById(id)
    const productExists = await productRepository.findByName(name)
    if (!product) {
      throw new AppError(`Produto com id ${id} informado não existe`, 400)
    }
    if (productExists) {
      throw new AppError(
        `Produto com o nome ${name} informado já existe, impossível atualizar`,
        400,
      )
    }
    product.name = name
    product.price = price
    product.quantity = quantity
    const updateProduct = productRepository.create({
      name,
      price,
      quantity,
    })
    await productRepository.save(updateProduct)
    return updateProduct
  }
}
