/* 处理图片上传 */
const formidable = require('formidable')
const path = require('path')

let upload = new formidable.IncomingForm()
upload.keepExtensions = true
upload.hash = 'md5'
let db_path = path.join(path.normalize(__dirname + '/../..'), 'db/blog')
console.log(db_path)
upload.uploadDir = db_path

function uploadFile (req, callback) {
  upload.parse(req, (err, files, file) => {
    if (err) return callback(err, null)
    console.log('-------------------------------------')
    console.log(file.image.path)
  })
}

module.exports = {
  '/upload': uploadFile
}
