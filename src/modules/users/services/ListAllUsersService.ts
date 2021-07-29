import { User } from "../typeorm/entities/User"
import { UserRepository } from "../typeorm/repository/Users"
import { getCustomRepository } from "typeorm"

export class ListAllUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository)
    const users = await userRepository.find()
    return users
  }
}
