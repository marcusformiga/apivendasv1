import { Router } from "express"
import { productRouter } from "../../../modules/products/routes/products.routes"
import { usersRouter } from "../../../modules/users/routes/users.routes"
import { sessionsRouter } from "../../../modules/users/routes/sessions.routes"
export const routes = Router()

routes.use("/products", productRouter)
routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
