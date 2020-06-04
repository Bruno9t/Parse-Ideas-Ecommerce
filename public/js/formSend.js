let formRegister = document.getElementById('form-register'),
formLogin = document.getElementById('form-login')

let imgEeyes = document.querySelector('img.eyes')

let erros0 = document.getElementById('erros0'),
erros1 = document.getElementById('erros1'),
erros2 = document.getElementById('erros2'),
erros3 = document.getElementById('erros3'),
erros4 = document.getElementById('erros4'),
erros5 = document.getElementById('erros5'),
erros6 = document.getElementById('erros6')

let inputEmail = document.getElementById('exampleInputEmail1'),
inputSenha = document.getElementById('exampleInputPassword1')

let inputNome2 = document.getElementById('exampleInputName2'),
inputSobrenome2 = document.getElementById('exampleInputSurname2'),
inputEmail2 = document.getElementById('exampleInputEmail2'),
inputSenha2 = document.getElementById('exampleInputPassword2'),
inputConfSenha2 = document.getElementById('exampleInputConfPassword2')

let li;

inputEmail.addEventListener('keyup',function(){
    validarEmail(this,erros1)
 })
inputSenha.addEventListener('keyup',function(){

    validarSenha(this,erros2)
})
inputNome2.addEventListener('keyup',function(){
    validarNome(this,erros3)
})
inputEmail2.addEventListener('keyup',function(){
    validarEmail(this,erros4)
})
inputSenha2.addEventListener('keyup',function(){
    validarSenha(this,erros5)
    validarIgualdadeDeSenhas(inputConfSenha2,inputSenha2,erros6)
})
inputConfSenha2.addEventListener('keyup',function(){
    validarIgualdadeDeSenhas(this,inputSenha2,erros6)
})
imgEeyes.addEventListener('click',function(){

    if(inputSenha2.type =='text'){
        imgEeyes.src = "/images/svg/illuminati.svg"
        inputSenha2.type = 'password'
        inputConfSenha2.type = 'password'
    }else{
        imgEeyes.src = "/images/svg/eyes.svg"

        inputSenha2.type = 'text'
        inputConfSenha2.type = 'text'
    }
})
formRegister.addEventListener('submit',function(e){
    e.preventDefault()

    enviarDados('/register',{
        nome:inputNome2.value.trim(),
        sobrenome:inputSobrenome2.value.trim(),
        email:inputEmail2.value.trim(),
        senha:inputSenha2.value,
        confSenha:inputConfSenha2.value,
    },validarRegistro)

})
formLogin.addEventListener('submit',function(e){
    e.preventDefault()

    enviarDados('/login',{
        email:inputEmail.value.trim(),
        senha:inputSenha.value,
    },validarLogin)

})

function validarEmail(inputEmail,errorList){
    let emailValid = inputEmail.value
    let splitEmail = inputEmail.value.split('@')
    let pattern = /[#$%*&()=!/\<>, ;+'"{}]/
    let point;

    if(!emailValid.includes('@') ||
     pattern.test(emailValid)
     ){ 

        return inputEmail.style.backgroundColor = '#E05D54'

    }else if(splitEmail.length!==2 ||
             splitEmail[0].length<1 || 
             splitEmail[1].length<3 ||
             splitEmail[0][0]=='.' ||
             !isNaN(parseInt(splitEmail[0]))
             ){
 
            return inputEmail.style.backgroundColor = '#E05D54'

    }else if(!emailValid.includes('.')){

        return inputEmail.style.backgroundColor = '#E05D54'

    }

    point = splitEmail[1].split('.')
    
    if(point.length<2 ||
       point[1].length < 2 ||
       point[0].length ==0 ||
       /\d/.test(point[1])
             ){

        return inputEmail.style.backgroundColor = '#E05D54'
    }else{
        limparErro(errorList)
        return inputEmail.style.backgroundColor = '#6DE677'

    }

}

function validarSenha(inputSenha,errorList){
    if(inputSenha.value.length < 8){
        return inputSenha.style.backgroundColor = '#E05D54'
    }else{
        limparErro(errorList)
        return inputSenha.style.backgroundColor = '#6DE677'
    }
}

function validarNome(inputNome,errorList){
    let pattern = /(\d|\s)/

    if(inputNome.value.length < 3 || pattern.test(inputNome.value)){

        inputNome.style.backgroundColor = '#E05D54'
    }else{

        limparErro(errorList)
        inputNome.style.backgroundColor = '#6DE677'
    }


}

function validarIgualdadeDeSenhas(inputConfSenha,inputSenha,errorList){
    if(inputConfSenha.value!==inputSenha.value){
        return inputConfSenha.style.backgroundColor = '#E05D54'
    }else{
        limparErro(errorList)
        return inputConfSenha.style.backgroundColor = '#6DE677'
    }
}

function validarLogin(data){
    if(data.cod == 1){
        inputEmail.style.backgroundColor = '#E05D54'
        inputSenha.style.backgroundColor = '#E05D54'

        li = document.createElement('li')
        li.setAttribute('style',
        'font-size:13px')
        limparErro(erros0)

        li.innerHTML = `
        <b style='color:red'>${data.msg}</b>
        `
        erros0.appendChild(li)

    }

    if(!data.errors.length){
        window.location = window.location.origin+'/panel'
    }else{
    data.errors.forEach(function(error){

        if(error.param == 'email'){
                criarErro(inputEmail,erros1,error)

        }else if(error.param=='senha'){
                criarErro(inputSenha,erros2,error)

        }
    }) 
}
}

function validarRegistro(data){
    if(!data.errors.length){

        window.location = window.location.origin+'/panel'

    }else{
    data.errors.forEach(function(error){
        if(error.param == 'email'){
                criarErro(inputEmail2,erros4,error)

        }else if(error.param=='senha'){
                criarErro(inputSenha2,erros5,error)

        }else if(error.param =='nome'){
                criarErro(inputNome2,erros3,error)

        }else if(error.param =='confSenha'){
                criarErro(inputConfSenha2,erros6,error)

        }
    }) 
}
    
}

function enviarDados(pathURL,data,validarAcesso){

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

        validarAcesso(datas)

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


function criarErro(input,errorList,error){

    input.style.backgroundColor = '#E05D54'

    li = document.createElement('p')
    li.setAttribute('style',
    'font-size:13px')
    limparErro(errorList)

    li.innerHTML = `
    <b style='color:red'>${error.msg}</b>
    `
    errorList.appendChild(li)

}

