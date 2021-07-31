import { Router } from "express"
import { ProfileController } from "../controllers/ProfileController"

export const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.get("/:id", profileController.list)


