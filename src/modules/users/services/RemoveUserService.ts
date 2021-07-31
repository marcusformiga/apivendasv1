import { AppError } from "../../../shared/errors/AppError"
import { UserRepository } from "../typeorm/repository/Users"
import { User } from "../typeorm/entities/User"
import { getCustomRepository } from "typeorm"

export class RemoveUserService {
  public async execute(id: string): Promise<string> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(id)
    if (!user) {
      throw new AppError(`Usuário com id ${id} não encontrado,`, 404)
    }
    await userRepository.remove(user)
    return id
  }
}
