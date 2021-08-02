import { AppError } from "../../../shared/errors/AppError"
import { Order } from "../typeorm/entities/Order"
import { OrdersRepository } from "../typeorm/repository/OrdersRepository"
import { getCustomRepository } from "typeorm"

export class ListOrderService {
  public async execute(id: string): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository)
    const order = await orderRepository.findById(id)
    if (!order) {
      throw new AppError(`Não existe pedido com id ${id}`)
    }
    return order
  }
}
