// verificar se existe cliente cadastrado
// verificar se existe produto
// verificar se os produtos passados tem estoque suficiente
// atualizar estoque

import { CustomersRepository } from "../../customers/typeorm/repositories/CustomersRepository"
import { OrdersRepository } from "../typeorm/repository/OrdersRepository"
import { ProductsRepository } from "../../products/typeorm/repository/ProductRepository"
import { AppError } from "../../../shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import { Order } from "../typeorm/entities/Order"

interface IProduct {
  id: string
  quantity: number
}
interface IRequest {
  customer_id: string
  products: IProduct[]
}
export class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerRepository = getCustomRepository(CustomersRepository)
    const productRepository = getCustomRepository(ProductsRepository)
    const orderRepository = getCustomRepository(OrdersRepository)
    const customerExists = await customerRepository.findById(customer_id)
    if (!customerExists) {
      throw new AppError(`Não existe cliente com id ${customer_id}`, 404)
    }
    const productsExists = await productRepository.findAllByIds(products)
    if (!productsExists.length) {
      throw new AppError("Produtos não encontrados")
    }
    const productIdExists = productsExists.map(product => product.id)
    const checkInexistentsProducts = products.filter(
      product => !productIdExists.includes(product.id),
    )
    if (checkInexistentsProducts.length) {
      throw new AppError(
        `Não foi possivel encontrar o produto com id ${checkInexistentsProducts[0].id}`,
      )
    }
    const quantityAvaliable = products.filter(
      product =>
        productsExists.filter(prod => prod.id === product.id)[0].quantity <
        product.quantity,
    )
    if (quantityAvaliable.length) {
      throw new AppError(
        `A quantidade do product ${quantityAvaliable[0].quantity} é insuficiente`,
        401,
      )
    }
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(prod => prod.id === product.id)[0].price,
    }))
    const order = orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    })
    return order
  }
}
