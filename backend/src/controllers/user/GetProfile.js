import { dataToJSON } from '../../helpers/jsonConverter.js'
import { mst_users } from '../../scripts/modals/mst_users.js'

export default async function GetProfile(req, res) {
  try {
    const user_data = await mst_users.findOne({
      where: {
        user_id: req.token_data.user_id,
      },
    })
    if (!!!user_data) {
      return res.status(404).json([{ message: 'User not found!' }])
    } else {
      const new_data = dataToJSON(user_data)
      delete new_data.user_id
      delete new_data.user_password
      delete new_data.createdAt
      delete new_data.updatedAt
      delete new_data.user_isactive
      delete new_data.user_isverified
      res.status(200).json({ message: 'Request successful!', data: new_data })
    }
  } catch (error) {
    return res.status(500).json([{ message: 'Something went wrong' }])
  }
}
