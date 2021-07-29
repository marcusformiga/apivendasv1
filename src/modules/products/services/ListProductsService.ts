import { Product } from "../typeorm/entities/Product"
import { ProductsRepository } from "../typeorm/repository/ProductRepository"
import { getCustomRepository } from "typeorm"

export class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository)
    const products = await productsRepository.find()
    return products
  }
}
