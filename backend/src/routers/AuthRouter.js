import { Router } from 'express'
import Controllers from '../controllers/index.js'
import { verifyLogin, verifyRegister } from '../validators/auth.js'
import { RequestValidator } from '../validators/index.js'

const AuthRoutes = Router()

AuthRoutes.post('/login', RequestValidator(verifyLogin), Controllers.auth.Login)

AuthRoutes.post(
  '/register',
  RequestValidator(verifyRegister),
  Controllers.auth.Register,
)

export default AuthRoutes
