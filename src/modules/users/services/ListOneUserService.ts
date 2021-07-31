import { User } from "../typeorm/entities/User"
import { UserRepository } from "../typeorm/repository/Users"
import { getCustomRepository } from "typeorm"
import { AppError } from "../../../shared/errors/AppError"

export class ListOneUserService {
  public async execute(id: string): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(id)
    if (!user) {
      throw new AppError(
        `Usuário com id ${id} informado não foi encontrado`,
        404,
      )
    }
    return user
  }
}
