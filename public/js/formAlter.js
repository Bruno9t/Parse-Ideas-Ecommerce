const form1 = document.getElementById('alter-user')

const nome = document.getElementById('recipient-name')
const sobrenome = document.getElementById('recipient-surname')

const erros0 = document.getElementById('erros0')
const erros1 = document.getElementById('erros1')
const erros2 = document.getElementById('erros2')
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
    })

})

function validarNome(inputNome,errorList){
    let pattern = /(\d|\s)/

    if(inputNome.value.length < 3 || pattern.test(inputNome.value)){

        inputNome.style.backgroundColor = '#E05D54'
    }else{

        limparErro(errorList)
        inputNome.style.backgroundColor = '#6DE677'
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
                nome.style.backgroundColor = '#E05D54'

            li = document.createElement('li')
            li.setAttribute('style',
            'font-size:13px')
            limparErro(erros0)

            li.innerHTML = `
            <b style='color:red'>${error.msg}</b>
            `
            erros0.appendChild(li)
            }else{
                sobrenome.style.backgroundColor = '#E05D54'

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


function enviarDados(pathURL,data){

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

        validarDados(datas)

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