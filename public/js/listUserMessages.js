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
  })
}