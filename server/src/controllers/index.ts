import { AdminController } from './adminController.js'
import { AgencyController } from './agencyController.js'
import { AuthController } from './authController.js'
import { ClientController } from './clientController.js'
import { DealController } from './dealController.js'
import { FileController } from './fileController.js'
import { LeadController } from './leadController.js'
import { NewsController } from './newsController.js'
import { RealtyController } from './realtyController.js'
import { TodoController } from './todoController.js'
import { UserController } from './userController.js'

const controllers: any[] = []

controllers.push(AdminController)
controllers.push(AgencyController)
controllers.push(AuthController)
controllers.push(ClientController)
controllers.push(DealController)
controllers.push(FileController)
controllers.push(LeadController)
controllers.push(NewsController)
controllers.push(RealtyController)
controllers.push(TodoController)
controllers.push(UserController)

export default controllers
