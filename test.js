const fs = require('fs')
const {resolve} = require('path')

let useFiles = {}

console.log(fs.readdirSync(routesPath))
fs
.readdirSync(routesPath)
    .forEach(file=>{
        // useFiles[file.split('.')[0]] = require(resolve(file))
        console.log(resolve('routes',file))
})

console.log(useFiles)

