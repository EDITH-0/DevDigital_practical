import { ModuleRoutes } from '../constants/index.js'
import AuthRoutes from './AuthRouter.js'
import UserRoutes from './UserRouter.js'

const Approuters = (app) => {
  //Authentication Routes
  app.use(ModuleRoutes.Auth, AuthRoutes)

  //User Routes
  app.use(ModuleRoutes.User, UserRoutes)
}

export default Approuters
