import { AgencyController } from './agencyController.js'
import { UserController } from './userController.js'
import { NewsController } from './newsController.js'
import { AuthController } from './authController.js'
import { RealtyController } from './realtyController.js'

const controllers: any[] = []

controllers.push(AgencyController)
controllers.push(AuthController)
controllers.push(NewsController)
controllers.push(RealtyController)
controllers.push(UserController)

export default controllers
