const path = require('path')

let str = {
    nome:'Bruno',
    idade:19
}


console.log({
    status:'online',
    ...str
})

