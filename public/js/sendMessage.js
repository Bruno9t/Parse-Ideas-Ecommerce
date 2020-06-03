let frmMessage = document.querySelector('#formMessage')
let edtName = document.querySelector("#viewerName");
let edtTell = document.querySelector("#viewerTell");
let txtMessage = document.querySelector("#txtMessage");
let edtEmail = document.querySelector("#viewerEmail");
let edtCell = document.querySelector("#viewerCell");
let btnSend = document.querySelector("#btnSend")

let resp 
let user_id = document.querySelector("#viewerUser").value
let announce = document.querySelector("#viewAnnounce").value
let divMessage = document.querySelector("#message")

frmMessage.addEventListener('submit', function(e){
  e.preventDefault()

  // if(document.querySelector("#respSuccess")){
  //   let divSuccess = document.querySelector("#respSuccess");
  //   divSuccess.remove()
  // }

  // if (document.querySelector("#respError")) {
  //   let divError = document.querySelector("#respError")
  //   divError.remove()
  // }

  sendMessage({
    usuario_id: user_id,
    anuncio_id: announce,
    nome: edtName.value.trim(),
    email: edtEmail.value.trim(),
    telefone: edtTell.value.trim(),
    celular: edtCell.value.trim(),
    mensagem: txtMessage.value.trim()
  })
})

function showResp(data){
  clearPage();
  
  if(data.resp == 'ok'){
    divMessage.innerHTML += `
    <div id="respSuccess" class="alert alert-success" role="alert">
      Mensagem enviada com Sucesso!
    </div>
    `
  } else {
    divMessage.innerHTML += `
    <div id="respError" class="alert alert-danger" role="alert">
      Algo deu errado :(
    </div>
    `
    console.log("error")
  }
}

function clearPage(){
  edtName.value = "";
  edtEmail.value = "";
  edtCell.value = "";
  edtTell.value = "";
  txtMessage.value = "";
}

function sendMessage(message) {
  fetch(window.location.origin+'/message/create',{ 
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