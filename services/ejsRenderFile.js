const ejs = require('ejs')
const {resolve} = require('path')

async function renderFile(file,vars = {}){
    let ejsFile = await ejs.renderFile(resolve('views',file),vars)


    return ejsFile

}

module.exports = renderFile