import { AdminController } from './adminController.js'
import { AgencyController } from './agencyController.js'
import { AuthController } from './authController.js'
import { LeadController } from './leadController.js'
import { NewsController } from './newsController.js'
import { RealtyController } from './realtyController.js'
import { UserController } from './userController.js'

const controllers: any[] = []

controllers.push(AdminController)
controllers.push(AgencyController)
controllers.push(AuthController)
controllers.push(LeadController)
controllers.push(NewsController)
controllers.push(RealtyController)
controllers.push(UserController)

export default controllers
