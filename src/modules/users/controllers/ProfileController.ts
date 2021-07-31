import { Request, Response } from "express"
import { ListOneUserService } from "../services/ListOneUserService"
import { UpdateProfileService } from "../services/UpdateProfileService"

export class ProfileController {
  public async list(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const listUser = new ListOneUserService()
    const user = await listUser.execute(id)
    return response.json(user)
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id, name, email, password } = request.body
    const updateUser = new UpdateProfileService()
    const dataUser = await updateUser.execute({
      user_id,
      name,
      email,
      password,
    })
    return response.json(dataUser)
  }
}
