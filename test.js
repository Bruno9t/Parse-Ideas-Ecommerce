const fs = require('fs')
const {resolve} = require('path')

const routesPath = resolve('routes')

let useFiles = {}

console.log(fs.readdirSync(routesPath))
fs
.readdirSync(routesPath)
    .forEach(file=>{
        useFiles[file.split('.')[0]] = require(resolve(routesPath,file))
})

console.log(useFiles)

