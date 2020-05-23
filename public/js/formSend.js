let formRegister = document.getElementById('form-register')
let formLogin = document.getElementById('form-login')

let erros1 = document.getElementById('erros1')
let erros2 = document.getElementById('erros2')
let erros3 = document.getElementById('erros3')
let erros4 = document.getElementById('erros4')
let erros5 = document.getElementById('erros5')

let inputEmail = document.getElementById('exampleInputEmail1')
let inputSenha = document.getElementById('exampleInputPassword1')

let inputNome2 = document.getElementById('exampleInputName2')
let inputSobrenome2 = document.getElementById('exampleInputSurname2')
let inputEmail2 = document.getElementById('exampleInputEmail2') 
let inputSenha2 = document.getElementById('exampleInputPassword2')

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
})

formRegister.addEventListener('submit',function(e){
    e.preventDefault()

    enviarDados('/register',{
        nome:inputNome2.value.trim(),
        sobrenome:inputSobrenome2.value.trim(),
        email:inputEmail2.value.trim(),
        senha:inputSenha2.value.trim(),
    },validarRegistro)

})
formLogin.addEventListener('submit',function(e){
    e.preventDefault()

    enviarDados('/login',{
        email:inputEmail.value.trim(),
        senha:inputSenha.value.trim(),
    },validarLogin)

})

function validarEmail(inputEmail,errorList){
    let emailValid = inputEmail.value

    let splitEmail = inputEmail.value.split('@')
    let point;

    if(!emailValid.includes('@') || emailValid.includes(' ') ){ 

        return inputEmail.style.backgroundColor = '#E05D54'

    }else if(splitEmail.length!==2 ||
             splitEmail[0].length<1 || 
             splitEmail[1].length<3 ||
             splitEmail[0][0]=='.' ||
             !isNaN(parseInt(splitEmail[0]))
             ){
 
            return inputEmail.style.backgroundColor = '#E05D54'

    }else if(!emailValid.includes('.') || emailValid.includes(' ') ){

        return inputEmail.style.backgroundColor = '#E05D54'

    }

    point = splitEmail[1].split('.')
    console.log(parseInt(point[1]),point[1])
    
    if(point.length<2 ||
             point[1].length < 2 ||
             point[0].length ==0 ||
             !isNaN(parseInt(point[1]))
             ){

        return inputEmail.style.backgroundColor = '#E05D54'
    }else{
        limparErro(errorList)
        return inputEmail.style.backgroundColor = '#6DE677'

    }

}

function validarSenha(inputSenha,errorList){
    if(inputSenha.value.length < 8){
        inputSenha.style.backgroundColor = '#E05D54'
    }else{
        limparErro(errorList)
        inputSenha.style.backgroundColor = '#6DE677'
    }
}

function validarNome(inputNome,errorList){
    if(inputNome.value.length < 3){
        inputNome.style.backgroundColor = '#E05D54'
    }else{
        limparErro(errorList)
        inputNome.style.backgroundColor = '#6DE677'
    }


}

function validarLogin(data){
    if(!data.errors.length){
        window.location = window.location.origin+'/announcements'
    }else{
    data.errors.forEach(function(error){
        if(error.param == 'email'){
            inputEmail.style.backgroundColor = '#E05D54'

                li = document.createElement('li')
                li.setAttribute('style',
                'font-size:13px')
                limparErro(erros1)

                li.innerHTML = `
                <b style='color:red'>${error.msg}</b>
                `
                erros1.appendChild(li)



        }else if(error.param=='senha'){
            inputSenha.style.backgroundColor = '#E05D54'



                li = document.createElement('li')
                li.setAttribute('style',
                'font-size:13px')
                limparErro(erros2)

                li.innerHTML = `
                <b style='color:red'>${error.msg}</b>
                `
                erros2.appendChild(li)

        }
    }) 
}
}

function validarRegistro(data){
    if(!data.errors.length){

        window.location = window.location.origin+'/announcements'
    }else{
    data.errors.forEach(function(error){
        if(error.param == 'email'){
            inputEmail2.style.backgroundColor = '#E05D54'

            
                li = document.createElement('p')
                li.setAttribute('style',
                'font-size:13px')
                limparErro(erros4)

                li.innerHTML = `
                <b style='color:red'>${error.msg}</b>
                `
                erros4.appendChild(li)


        }else if(error.param=='senha'){
            inputSenha2.style.backgroundColor = '#E05D54'


                li = document.createElement('p')
                li.setAttribute('style',
                'font-size:13px')
                limparErro(erros5)

                li.innerHTML = `
                <b style='color:red'>${error.msg}</b>
                `
                erros5.appendChild(li)

    

        }else if(error.param =='nome'){
            inputNome2.style.backgroundColor = '#E05D54'

                li = document.createElement('p')
                li.setAttribute('style',
                'font-size:13px')
                limparErro(erros3)

                li.innerHTML = `
                <b style='color:red'>${error.msg}</b>
                `
                erros3.appendChild(li)


        }
    }) 
}
    
}

function enviarDados(pathURL,data,validarAccess){

    let config = {
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
        }
    }

    fetch(window.location+pathURL,config)
    .then(response => {
        return response.json()
    }).then(datas => {

        validarAccess(datas)

    }).catch(function(err){
 
        console.log(err)

    })

}

function limparErro(l){
    if(l!=undefined){
        l.innerHTML=''
    }
}