let ulMessages = document.getElementById("ulMessages")

window.onload = function() {
  bringMessages();
  setInterval(bringMessages, 120000)
}

let resp

function bringMessages() {
  fetch(window.location.origin+'/message/list', {
    method:'GET'
  }).then(resp => {
    return resp.json()
  }).then(data => {
    resp = data
    buildLis(data)
  })
}

function buildLis(data) {
  ulMessages.innerHTML = "";

  data.forEach(row => {
    ulMessages.innerHTML += `
      <li>nome:${row.nome} mensagem:${row.mensagem}<a class="btn btn-success" href="/announcements/${row.anuncio_id}">Anuncio</a></li>
    `
  })
}