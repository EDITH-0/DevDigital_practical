import { Router } from 'express'
import Controllers from '../controllers/index.js'
import { DecryptToken } from '../helpers/decryptToken.js'
import { RequestValidator } from '../validators/index.js'
import { verifyUpdateUser } from '../validators/user.js'

const UserRoutes = Router()

UserRoutes.get('/profile', DecryptToken, Controllers.user.GetProfile)

UserRoutes.post(
  '/profile',
  DecryptToken,
  // validData,
  Controllers.user.uploadProfile,
  RequestValidator(verifyUpdateUser),
  Controllers.user.UpdateProfile,
)

export default UserRoutes
