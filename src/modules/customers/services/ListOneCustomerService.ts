import { Customer } from "../typeorm/entities/Customer"
import { getCustomRepository } from "typeorm"
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository"
import { AppError } from "../../../shared/errors/AppError"

export class ListOneCustomerService {
  public async execute(id: string): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository)
    const customerExist = await customerRepository.findById(id)
    if (!customerExist) {
      throw new AppError(`Cliente com id ${id} informado não encontrado`, 404)
    }
    return customerExist
  }
}
