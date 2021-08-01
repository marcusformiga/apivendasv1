import { Router } from "express"
import { productRouter } from "../../../modules/products/routes/products.routes"
import { usersRouter } from "../../../modules/users/routes/users.routes"
import { sessionsRouter } from "../../../modules/users/routes/sessions.routes"
import { passwordRoutes } from "../../../modules/users/routes/password.routes"
import { profileRouter } from "../../../modules/users/routes/profile.routes"
import { customersRoutes } from "../../../modules/customers/routes/customers.routes"
export const routes = Router()

routes.use("/products", productRouter)
routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/password", passwordRoutes)
routes.use("/profile", profileRouter)
routes.use("/customers", customersRoutes)
