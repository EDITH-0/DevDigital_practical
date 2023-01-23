import { Login, Register } from './auth/index.js'
import { GetProfile, UpdateProfile, uploadProfile } from './user/index.js'

const Controllers = {
  auth: { Login, Register },
  user: { GetProfile, UpdateProfile, uploadProfile },
}

export default Controllers
