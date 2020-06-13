const multer = require('multer')
const {extname, resolve} = require('path')


function multerStorage(destImagem, config = {}, destPdf = ''){

      let storage = multer.diskStorage({
        destination(req,file,cb){
          if(extname(file.originalname) == '.pdf'){
            cb(null, resolve(destPdf))
          }else{
            cb(null, resolve(destImagem))
          }
        },
      
        filename(req,file,cb){
              cb(null,file.fieldname+'-'+Date.now()+extname(file.originalname))
        }
      })

      return multer({
          storage,
          ...config,
        })
}

module.exports = multerStorage