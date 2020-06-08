let frmMessage = document.querySelector('#formMessage')
let edtName = document.querySelector("#viewerName");
let edtTell = document.querySelector("#viewerTell");
let txtMessage = document.querySelector("#txtMessage");
let edtEmail = document.querySelector("#viewerEmail");
let edtCell = document.querySelector("#viewerCell");
let btnSend = document.querySelector("#btnSend")
let result = document.getElementById('result-message')

let resp 
let usuario_id = document.querySelector("#viewerUser")
let anuncio_id = document.querySelector("#viewAnnounce")
let divMessage = document.querySelector("#message")

frmMessage.addEventListener('submit', function(e){
  e.preventDefault()

  if(document.querySelector("#respSuccess")){
    let divSuccess = document.querySelector("#respSuccess");
    divSuccess.remove()
  }

  if (document.querySelector("#respError")) {
    let divError = document.querySelector("#respError")
    divError.remove()
  }


  sendMessage({
    usuario_id:Number(usuario_id.value),
    anuncio_id:Number(anuncio_id.value),
    nome: edtName.value.trim(),
    email: edtEmail.value.trim(),
    telefone: edtTell.value.trim(),
    celular: edtCell.value.trim(),
    mensagem: txtMessage.value.trim()
  })
})

function showResp(data){
  
  if(data.resp == 'ok'){
    clearForm()

    result.innerHTML += `
    <div id="respSuccess" class="alert alert-success" role="alert">
      Mensagem enviada com Sucesso!
    </div>
    `
  } else {
    result.innerHTML += `
    <div id="respError" class="alert alert-danger" role="alert">
      Algo deu errado :(
    </div>
    `
  }

}

function clearForm(){
  edtName.value = "";
  edtEmail.value = "";
  edtCell.value = "";
  edtTell.value = "";
  txtMessage.value = "";
}


function sendMessage(message) {
  fetch(window.location.origin+`/message/create`,{ 
    method:'POST',
    body:JSON.stringify(message),
    headers: {'Content-Type':'application/json'}
  }).then(resp => {
    return resp.json()
  }).then(data => {
    resp = data
    showResp(data)
  }).catch(err => {
    console.log(err)
  })
}