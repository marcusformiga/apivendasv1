import { Customer } from "../typeorm/entities/Customer"
import { getCustomRepository } from "typeorm"
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository"
import { AppError } from "../../../shared/errors/AppError"

interface IRequest {
  id: string
  name: string
  email: string
}
export class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository)
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError(`Não existe cliente com id ${id} informado`, 404)
    }
    const customerExists = await customerRepository.findByEmail(email)
    if (customerExists && email !== customer.email) {
      throw new AppError("Já existe um cliente com este email", 409)
    }
    customer.name = name
    customer.email = email

    await customerRepository.save({ name, email })
    return customer
  }
}
