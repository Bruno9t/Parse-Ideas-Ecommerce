let frmMessage = document.querySelector('#formMessage')
let edtName = document.querySelector("#viewerName");
let edtTell = document.querySelector("#viewerTell");
let txtMessage = document.querySelector("#txtMessage");
let errors 
let user_id = document.querySelector("#user").name
let announce = document.querySelector("#announce").name

frmMessage.addEventListener('submit', function(e){
  e.preventDefault()

  sendMessage({
    usuario_id: user_id,
    anuncio_id: user_id,
    nome: edtName.value.trim(),
    telefone: edtTell.value.trim(),
    mensagem: txtMessage.value.trim()
  })
})

function sendMessage(message) {
  fetch(window.location.origin+'/create',{
    method:'POST',
    body:JSON.stringify(message),
    headers: {'Content-Type':'application/json'}
  }).then(resp => {
    return resp.json()
  }).then(data => {
    console.log(data)
    errors = data
  }).catch(function(err){
    console.log(err)
  })
}