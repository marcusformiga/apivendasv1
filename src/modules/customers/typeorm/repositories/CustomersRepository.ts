import { Customer } from "../entities/Customer"
import { Repository, EntityRepository } from "typeorm"

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: { name },
    })
    return customer
  }
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: { id },
    })
    return customer
  }
}
