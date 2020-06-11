let email = document.querySelector('#exampleInputEmail')


formForgot.addEventListener('submit',function(e){
    e.preventDefault()

    sendData('/forgot?_method=PUT',{
        email,
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


