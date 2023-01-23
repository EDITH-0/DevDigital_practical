import { dataToJSON } from '../../helpers/jsonConverter.js'
import { mst_users } from '../../scripts/modals/mst_users.js'
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const unlinkAsync = promisify(fs.unlink)

export default async function UpdateProfile(req, res) {
  try {
    const user_data = await mst_users.findOne({
      where: {
        user_id: req.token_data.user_id,
      },
    })
    if (!!!user_data) {
      return res.status(404).json([{ message: 'User not found!' }])
    } else {
      if (user_data.user_profile_image && req.body.profile_image) {
        const __filename = fileURLToPath(import.meta.url)

        const __dirname = path.dirname(__filename)
        await unlinkAsync(
          path.join(
            __dirname.replace('/src/controllers/user', '/'),
            user_data.user_profile_image,
          ),
        )
      }
      user_data.user_first_name = req.body.first_name
      user_data.user_last_name = req.body.last_name
      user_data.user_phone = req.body.phone
      user_data.user_address = req.body.address
      if (req.body?.profile_image) {
        console.log(
          '🚀 => UpdateProfile => req.body?.profile_image',
          req.body?.profile_image,
        )
        user_data.user_profile_image = req.body.profile_image
      }
      await user_data.save()
      const new_data = dataToJSON(user_data)
      delete new_data.user_id
      delete new_data.user_password
      delete new_data.createdAt
      delete new_data.updatedAt
      delete new_data.user_isactive
      delete new_data.user_isverified
      return res
        .status(200)
        .json({ message: 'Request successful!', data: new_data })
    }
  } catch (error) {
    return res.status(500).json([{ message: 'Something went wrong' }])
  }
}
