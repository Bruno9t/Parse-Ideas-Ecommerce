let formReset = document.getElementById('form-reset')

let newPass = document.getElementById('exampleInputNewPass')
let confNewPass = document.getElementById('exampleInputConfNewPass')

let urlParams = window.location.pathname.split('/')

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
    })

}