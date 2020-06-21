let form = document.querySelector('[name = send_news]')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  let data = {
    name: document.forms["send_news"]["name"].value,
    email: document.forms["send_news"]["email"].value
  }
  if(data.name == "" || data.email == ""){
    Swal.fire({
      title: 'Oops...',
      text: 'Por favor preecha todos os campos!',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }else{
    let pathURL = 'http://' + window.location.host + '/newsletter'
    let config = {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    fetch(pathURL, config).then(response => {
      return response.json()
    }).then(datas => {
      console.log(datas)
      Swal.fire({
        icon: 'success',
        title:'Cadastro Efetuado',
        text:`${datas.nome}, te enviamos um e-mail de boas-vindas! :)`,
        confirmButtonText: 'OK'
      })
    }).catch(err => {
      console.log(err)
    })

  }
})




