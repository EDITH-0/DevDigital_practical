import { EncryptToken } from '../../helpers/decryptToken.js'
import { dataToJSON } from '../../helpers/jsonConverter.js'
import { mst_users } from '../../scripts/modals/mst_users.js'

export default async function Login(req, res) {
  try {
    const user_data = await mst_users.findOne({
      where: {
        user_email: req.body.email,
      },
    })
    if (!!!user_data) {
      return res.status(404).json([{ message: 'User not found!' }])
    } else {
      user_data.validateUserPassword(req.body.password).then(async (msg) => {
        if (msg) {
          const token = EncryptToken(dataToJSON(user_data))
          return res.status(200).json({
            message: 'Login successful',
            auth_token: token,
          })
        } else {
          return res.status(401).json([{ message: 'Invalid Credentials' }])
        }
      })
    }
  } catch (error) {
    return res.status(500).json([{ message: 'Something went wrong' }])
  }
}
