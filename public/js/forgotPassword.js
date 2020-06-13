let formForgot = document.querySelector('#form-forgot')
let email = document.querySelector('#exampleInputEmail')
let sendMailButton = document.getElementById('sendMail')
let title = document.getElementById('title')

let erros0 = document.getElementById('erros0')
let erros1 = document.getElementById('erros1')


formForgot.addEventListener('submit',function(e){
    e.preventDefault()

    sendData('/forgot?_method=PATCH',{
        email:email.value.trim(),
    })

})

email.addEventListener('keyup',function(){
    validarEmail(email,erros1)
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
    
            return criarResultado('Tudo Ok!','green',erros0,decodedData)
    
        }

        if(decodedData.cod == 2){
            return criarResultado('Opss!','red',erros0,decodedData)
    
        }

        if(decodedData.errors.length){
            return criarErro(email,erros1,decodedData.errors[0])
        }
        
    })

}

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


function criarResultado(textTitle,textColor,errorList,message){

    li = document.createElement('li')
    
            li.setAttribute('style',
            'font-size:13px')
            limparErro(errorList)
    
            li.innerHTML = `
            <h3 class='text-center' style='color:${textColor}'>${message.msg}</h3>
            `
            title.innerHTML = textTitle

            email.remove()
            sendMailButton.remove()

            return errorList.appendChild(li)

}
