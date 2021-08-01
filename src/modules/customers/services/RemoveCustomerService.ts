import { Customer } from "../typeorm/entities/Customer"
import { getCustomRepository } from "typeorm"
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository"
import { AppError } from "../../../shared/errors/AppError"

export class RemoveCustomerService {
  public async execute(id: string): Promise<string> {
    const customerRepository = getCustomRepository(CustomersRepository)
    const customerExist = await customerRepository.findById(id)
    if (!customerExist) {
      throw new AppError(
        `Cliente com id ${id} informado não pode ser deletado`,
        404,
      )
    }
    return id
  }
}
