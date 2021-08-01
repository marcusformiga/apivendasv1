import { Customer } from "../typeorm/entities/Customer"
import { getCustomRepository } from "typeorm"
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository"

export class ListAllCustomersService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepository)
    const customers = await customerRepository.find()
    return customers
  }
}
