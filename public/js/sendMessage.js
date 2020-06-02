let frmMessage = document.querySelector('#formMessage')



frmMessage.addEventListener('submit', function(e){
  e.preventDefault()
})

function sendMessage(message) {
  fetch(window.location.origin+'/create')
}