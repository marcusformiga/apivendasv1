import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"
import { ListAllUsersService } from "../services/ListAllUsersService"
import { RemoveUserService } from "../services/RemoveUserService"
import { classToClass } from "class-transformer"
export class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const createUser = new CreateUserService()
    const user = await createUser.execute({ name, email, password })
    return response.status(201).json(classToClass(user))
  }
  public async listAll(request: Request, response: Response): Promise<Response>{
    const listAllUsers = new ListAllUsersService()
    const users = await listAllUsers.execute()
    return response.json(classToClass(users))
  }
  public async remove(request: Request, response: Response): Promise<Response>{
    const { id } = request.params
    const removeUser = new RemoveUserService()
    const user = await removeUser.execute(id)
    return response.send(`Usuário com id ${id} removido`)
  }
}

