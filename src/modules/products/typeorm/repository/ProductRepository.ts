import { Repository, EntityRepository, In } from "typeorm"
import { Product } from "../entities/Product"

interface IFindProduct {
  id: string
}
@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: { name },
    })
    return product
  }
  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: { id },
    })
    return product
  }
  public async findAllByIds(products: IFindProduct[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id)
    const existsProducts = await this.find({
      where: {
        id: In(productsIds),
      },
    })
    return existsProducts
  }
}
