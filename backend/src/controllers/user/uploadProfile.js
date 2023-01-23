import fs from 'fs'
import multer from 'multer'
import randomIDGenerator from '../../helpers/randomIDGenerator.js'

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('🚀 => file', file.mimetype)
    var dir = `user_data/profile/${file.mimetype.split('/').at(0)}`

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, `user_data/profile/${file.mimetype.split('/').at(0)}`)
  },
  filename: async function (req, file, cb) {
    const fileName = file.originalname
      ? randomIDGenerator(40) + '.' + file.originalname.split('.').at(-1)
      : randomIDGenerator(40)
    cb(null, fileName)
  },
})

var upload = multer({ storage: storage }).single('profile_image')

export default function uploadProfile(req, res, next) {
  upload(req, res, async function (err) {
    if (err) {
      return res.send('Error')
    }

    if (req.file) {
      const filePath = req.file.path
      req.body.profile_image = filePath.split('\\').join('/')
      next()
    } else {
      next()
    }
  })
}
