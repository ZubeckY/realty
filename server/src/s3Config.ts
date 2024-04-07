const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
import config from './config.js'
const app = express()
const s3 = new S3Client()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.CLOUD_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
