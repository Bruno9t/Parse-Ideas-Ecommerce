let formReset = document.getElementById('form-reset')

let sendMailButton = document.getElementById('sendMail')

let newPass = document.getElementById('exampleInputNewPass')
let confNewPass = document.getElementById('exampleInputConfNewPass')
let title = document.getElementById('title')

let urlParams = window.location.pathname.split('/')

confNewPass.addEventListener('keyup',function(){
    validarIgualdadeDeSenhas(this,newPass,erros2)
})

newPass.addEventListener('keyup',function(){
        validarSenha(this,erros1)
        validarIgualdadeDeSenhas(confNewPass,this,erros2)
})

formReset.addEventListener('submit',function(e){
    e.preventDefault()

    sendData('/reset?_method=PATCH',{
        id_usuario:Number(urlParams[2]),
        newPass:newPass.value,
        confNewPass:confNewPass.value
    })

})

function sendData(pathURL,data){

    let config = {
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    }

    fetch(window.location.origin+pathURL,config)
    .then(response => response.json())
    .then(decodedData=>{

        console.log(decodedData)
        if(decodedData.cod == 1){
            setTimeout(function(){
                window.location = window.location.origin+'/auth/access'
            },2000)

            return criarResultado('Tudo Ok!','green',erros0,decodedData)
    
        }

        if(decodedData.cod == 2){
            return criarResultado('Opss!','red',erros0,decodedData)
    
        }

        
        if(decodedData.errors.length){
        decodedData.errors.forEach(function(error){
    
            if(error.param == 'newPass'){
                    criarErro(newPass,erros1,error)
    
            }else if(error.param=='confNewPass'){
                    criarErro(confNewPass,erros2,error)
    
            }
        }) 
    }


    })

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

function criarResultado(textTitle,textColor,errorList,message){

    li = document.createElement('li')
    
            li.setAttribute('style',
            'font-size:13px')
            limparErro(errorList)
    
            li.innerHTML = `
            <h3 class='text-center' style='color:${textColor}'>${message.msg}</h3>
            `
            title.innerHTML = textTitle

            newPass.remove()
            confNewPass.remove()
            sendMailButton.remove()

            return errorList.appendChild(li)

}

function limparErro(listaDeErros){
    if(listaDeErros!=undefined){
        return listaDeErros.innerHTML=''
    }

    return true;
}

function validarSenha(inputSenha,errorList){
    if(inputSenha.value.length < 8){
        return inputSenha.style.backgroundColor = '#E05D54'
    }else{
        limparErro(errorList)
        return inputSenha.style.backgroundColor = '#6DE677'
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