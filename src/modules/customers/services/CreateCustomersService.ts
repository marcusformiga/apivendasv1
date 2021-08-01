import { Customer } from "../typeorm/entities/Customer"
import { getCustomRepository } from "typeorm"
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository"

interface IRequest {
  name: string
  email: string
}
export class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository)
    const customer = customerRepository.create({ name, email })
    await customerRepository.save(customer)
    return customer
  }
}
