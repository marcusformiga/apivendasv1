import { Request, Response } from "express"
import { CreateSessionsService } from "../services/CreateSessionsService"

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    console.log(email, password)
    const createSession = new CreateSessionsService()
    const session = await createSession.execute({ email, password })
    return response.json(session).status(201)
  }
}
