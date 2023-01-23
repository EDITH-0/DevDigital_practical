import { EncryptToken } from '../../helpers/decryptToken.js'
import { mst_users } from '../../scripts/modals/mst_users.js'

export default async function Register(req, res) {
  try {
    //Get exiting email user from database
    const existing_email = await mst_users.findOne({
      where: {
        user_email: req.body.email,
      },
    })

    //Existing email user is verified and is active if not then check on timing
    if (existing_email) {
      //Response send with error
      return res.status(409).json([
        {
          message: 'Email already exist.',
          key: 'email',
        },
      ])
    } else {
      //Creating new user
      const created_user = await mst_users.create({
        user_email: req.body.email,
        user_first_name: req.body.first_name,
        user_last_name: req.body.last_name,
        user_phone: req.body.phone,
        user_password: req.body.password,
        user_isactive: 1,
        user_isverified: 1,
      })
      if (created_user) {
        //Encrypt token
        const auth_token = EncryptToken(created_user)

        //Response send with success
        return res.status(200).json({
          message: 'Account created successfully',
          auth_token: auth_token,
        })
      } else {
        //Response send with error
        return res.status(500).json([{ message: 'Something went wrong' }])
      }
    }
  } catch (error) {
    console.log('🚀 => VerifyEmail => error', error)
    //Response send with error
    return res.status(500).json([{ message: 'Something went wrong' }])
  }
}
