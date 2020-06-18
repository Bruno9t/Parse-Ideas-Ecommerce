let formForgot = document.querySelector('#form-forgot')
let email = document.querySelector('#exampleInputEmail')
let emailWrap = document.querySelector('div.input-user-email')
let sendMailButton = document.getElementById('sendMail')
let title = document.getElementById('title')
let animationLoadingDiv = document.getElementById('loading')
let animationLoading = document.querySelector('div.loading')


let erros0 = document.getElementById('erros0')
let erros1 = document.getElementById('erros1')


formForgot.addEventListener('submit',function(e){
    e.preventDefault()

    if(validarEmail(email,erros1)){
        sendMailButton.remove()
        title.remove()

        animationLoading.classList.add('true')
    }

    sendData('/password/forgot?_method=PATCH',{
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
            animationLoading.classList.remove('true')
            animationLoadingDiv.appendChild(title)
            return criarResultado('Tudo Ok!','green',erros0,decodedData)
    
        }

        if(decodedData.cod == 2){
            animationLoading.classList.remove('true')
            animationLoadingDiv.appendChild(title)
            return criarResultado('Opss!','red',erros0,decodedData)
    
        }

        if(decodedData.errors.length){
            if(decodedData.errors[0].cod==5){
                animationLoading.classList.remove('true')

                formForgot.appendChild(sendMailButton)

                animationLoadingDiv.appendChild(title)
            }

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

        inputEmail.style.backgroundColor = '#f2f2f2'
        return false
    }else if(splitEmail.length!==2 ||
             splitEmail[0].length<1 || 
             splitEmail[1].length<3 ||
             splitEmail[0][0]=='.' ||
             !isNaN(parseInt(splitEmail[0]))
             ){
 

            return false
    }else if(!emailValid.includes('.')){

        inputEmail.style.backgroundColor = '#f2f2f2'
        return false
    }

    point = splitEmail[1].split('.')
    
    if(point.length<2 ||
       point[1].length < 2 ||
       point[0].length ==0 ||
       /\d/.test(point[1])
             ){

        inputEmail.style.backgroundColor = '#f2f2f2'
        return false
    }else{
        limparErro(errorList)
        inputEmail.style.backgroundColor = '#6DE677'
        return true
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
    <b style='color:rgb(247, 75, 75)'>${error.msg}</b>
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

            emailWrap.remove()

            return errorList.appendChild(li)

}
