const fs = require('fs')
const {resolve,basename} = require('path')

const uploadImagePath = resolve('..','public','images','uploads')

console.log(uploadImagePath)

console.log(resolve('..','public','images','uploads',basename('/images/uploads/file-1591248192268.png')))