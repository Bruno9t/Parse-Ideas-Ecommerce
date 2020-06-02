const form1 = document.getElementById('alter-user')
const form2 = document.getElementById('form-pass')

const nome = document.getElementById('recipient-name')
const sobrenome = document.getElementById('recipient-surname')

let inputSenha = document.getElementById('recipient-senha')
let inputSenha2 = document.getElementById('recipient-novaSenha')
let inputConfSenha2 = document.getElementById('recipient-confSenha')

const erros0 = document.getElementById('erros0')
const erros1 = document.getElementById('erros1')
const erros2 = document.getElementById('erros2')
const erros3 = document.getElementById('erros3')
const erros4 = document.getElementById('erros4')
const erros5 = document.getElementById('erros5')
const erros6 = document.getElementById('erros6')
let li;

nome.addEventListener('keyup',function(){
    validarNome(this,erros0)
})

sobrenome.addEventListener('keyup',function(){
    validarNome(this,erros1)
})



form1.addEventListener('submit',function(e){
    e.preventDefault()

    enviarDados('/user/update?_method=PUT',{
        nome:nome.value.trim(),
        sobrenome:sobrenome.value.trim()
    },validarDados)

})

function validarNome(inputNome,errorList){
    let pattern = /(\d|\s)/

    if(inputNome.value.length < 3 || pattern.test(inputNome.value)){

        inputNome.style.borderBottom = '2px #E05D54 solid'
    }else{

        limparErro(errorList)
        inputNome.style.borderBottom = '2px #6DE677 solid' 
    }
}

function validarDados(data){
    if(data.cod == 2){

        li = document.createElement('li')
        li.setAttribute('style',
        'font-size:13px')
        limparErro(erros2)

        li.innerHTML = `
        <b style='color:green'>${data.msg}</b>
        `
        erros2.appendChild(li)

        setTimeout(()=>{
            window.location.reload()
        },1000)
        

    }


    if(data.errors.length !== 0){
        data.errors.forEach(error=>{

            if(error.param==='nome'){
                nome.style.borderBottom = '2px #E05D54 solid'

            li = document.createElement('li')
            li.setAttribute('style',
            'font-size:13px')
            limparErro(erros0)

            li.innerHTML = `
            <b style='color:red'>${error.msg}</b>
            `
            erros0.appendChild(li)
            }else{
                sobrenome.style.borderBottom = '2px #E05D54 solid'

            li = document.createElement('li')
            li.setAttribute('style',
            'font-size:13px')
            limparErro(erros1)

            li.innerHTML = `
            <b style='color:red'>${error.msg}</b>
            `
            erros1.appendChild(li)

            }

        })

    }

}


function enviarDados(pathURL,data,validarMudancas){

    let config = {
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    fetch(window.location.href+pathURL,config)
    .then(response => {
        return response.json()
    }).then(datas => {

        validarMudancas(datas)

    }).catch(function(err){
 
        console.log(err)

    })

}



function limparErro(listaDeErros){
    if(listaDeErros!=undefined){
        return listaDeErros.innerHTML=''
    }

    return true;
}


//validação de senha

inputSenha.addEventListener('keyup',function(){
    validarSenha(this,erros3)
})

inputSenha2.addEventListener('keyup',function(){
    validarSenha(this,erros4)
    validarIgualdadeDeSenhas(inputConfSenha2,inputSenha2,erros5)
})

inputConfSenha2.addEventListener('keyup',function(){
    validarIgualdadeDeSenhas(this,inputSenha2,erros5)
})

form2.addEventListener('submit',function(e){
    e.preventDefault()

    enviarDados('/password/update?_method=PUT',{
        senha:inputSenha.value,
        novaSenha:inputSenha2.value,
        confSenha:inputConfSenha2.value,
    },validarNovaSenha)

})


function validarSenha(inputSenha,errorList){
    if(inputSenha.value.length < 8){
        return inputSenha.style.borderBottom = '2px #E05D54 solid'
    }else{
        limparErro(errorList)
        return inputSenha.style.borderBottom = '2px #6DE677 solid'
    }
}

function validarIgualdadeDeSenhas(inputConfSenha,inputSenha,errorList){
    if(inputConfSenha.value!==inputSenha.value){
        return inputConfSenha.style.borderBottom = '2px #E05D54 solid'
    }else{
        limparErro(errorList)
        return inputConfSenha.style.borderBottom = '2px #6DE677 solid'
    }
}
function validarNovaSenha(data){
    if(data.cod == 2){

        li = document.createElement('li')
        li.setAttribute('style',
        'font-size:13px')
        limparErro(erros6)

        li.innerHTML = `
        <b style='color:green'>${data.msg}</b>
        `
        erros6.appendChild(li)

        setTimeout(()=>{
            window.location.reload()
        },1000)
        

    }


if(!data.errors.length){

    window.location = window.location.origin+'/panel'

}else{
data.errors.forEach(function(error){
    if(error.param == 'senha'){
        inputSenha.style.borderBottom = '2px #E05D54 solid'

        
            li = document.createElement('p')
            li.setAttribute('style',
            'font-size:13px')
            limparErro(erros3)

            li.innerHTML = `
            <b style='color:red'>${error.msg}</b>
            `
            return erros3.appendChild(li)

    }else if(error.param=='novaSenha'){
        inputSenha2.style.borderBottom = '#E05D54'

            li = document.createElement('p')
            li.setAttribute('style',
            'font-size:13px')
            limparErro(erros4)

            li.innerHTML = `
            <b style='color:red'>${error.msg}</b>
            `
            erros4.appendChild(li)

    }else{
        inputConfSenha2.style.borderBottom = '2px #E05D54 solid'

            li = document.createElement('p')
            li.setAttribute('style',
            'font-size:13px')
            limparErro(erros5)

            li.innerHTML = `
            <b style='color:red'>${error.msg}</b>
            `
            erros5.appendChild(li)

    }
}) 
}
    
}