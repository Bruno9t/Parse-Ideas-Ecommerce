const multer = require('multer')
const {extname} = require('path')


function multerStorage(whereStorage){

      let storage = multer.diskStorage({
        destination(req,file,cb){
            cb(null,whereStorage)
        },
      
        filename(req,file,cb){
            cb(null,file.fieldname+'-'+Date.now()+extname(file.originalname))
        }
      })

      return multer({
          storage,
        })
}

module.exports = multerStorage