const {resolve} = require('path')

function findParentDir(parent){

let pathArray = resolve(__dirname).split('/')

for(let i = pathArray.length-1; pathArray[i] !== parent;i--){
    if(pathArray.length==0){
        return false
    }
    pathArray.pop()
}

    return pathArray.join('/')

}

module.exports = findParentDir