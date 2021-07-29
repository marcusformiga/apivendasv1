import { Router } from "express"
import { UserController } from "../controllers/UserController"

export const usersRouter = Router()
const userController = new UserController()

usersRouter.get("/", userController.listAll)
usersRouter.post("/", userController.create)

