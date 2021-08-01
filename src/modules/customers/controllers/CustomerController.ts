import { Request, Response } from "express"
import { CreateCustomerService } from "../services/CreateCustomersService"
import { ListOneCustomerService } from "../services/ListOneCustomerService"
import { ListAllCustomersService } from "../services/ListAllCustomersService"
import { UpdateCustomerService } from "../services/UpdateCustomerService"
import { RemoveCustomerService } from "../services/RemoveCustomerService"

export class CustomerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body
    const createCustomer = new CreateCustomerService()
    const customer = await createCustomer.execute({ name, email })
    return response.status(201).json(customer)
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListAllCustomersService()
    const customers = await listCustomers.execute()
    return response.json(customers)
  }
  public async listOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const id = request.params.id
    const listCustomer = new ListOneCustomerService()
    const customer = await listCustomer.execute(id)
    return response.json(customer)
  }
  public async remove(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const removeCustomer = new RemoveCustomerService()
    const customer = await removeCustomer.execute(id)
    return response.send(`Cliente com id ${id} removido.`)
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const { name, email } = request.body
    const updateCustomer = new UpdateCustomerService()
    const customer = await updateCustomer.execute({ id, name, email })
    return response.json(customer)
  }
}
