import { AgencyController } from './agencyController.js'
import { UserController } from './userController.js'
import { AuthController } from './authController.js'
import { RealtyController } from './realtyController.js'

const controllers: any[] = []

controllers.push(AgencyController)
controllers.push(AuthController)
controllers.push(RealtyController)
controllers.push(UserController)

export default controllers
