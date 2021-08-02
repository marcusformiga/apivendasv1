import { Request, Response } from "express"
import { CreateOrderService } from "../services/CreateOrderServices"
import { ListOrderService } from "../services/ListOrderService"

export class OrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body
    const createOrder = new CreateOrderService()
    const order = await createOrder.execute({ customer_id, products })
    return response.json(order).status(201)
  }
  public async listOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const id = request.params.id
    const listOrder = new ListOrderService()
    const order = await listOrder.execute(id)
    return response.json(order)
  }
}
