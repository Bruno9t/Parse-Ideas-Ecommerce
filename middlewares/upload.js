const multer = require('multer')
const {extname, join} = require('path')


function multerStorage(){

      let storage = multer.diskStorage({
        destination(req,file,cb){
          if(extname(file.originalname) == '.pdf'){
            cb(null, join('public','uploads','pdf'))
          }else{
            cb(null, join('public','images','uploads'))
          }
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