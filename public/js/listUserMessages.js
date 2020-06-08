let listMessages = document.getElementById("listMessages")
let buttonList = document.getElementById('viewMessages')
let messageNumber = document.getElementById('messageNumber')
let divButton = document.querySelector('div.viewMore')
let viewMoreButton = document.querySelector('div.viewMore button')
let count=0;

window.onload = function() {
  bringMessages(currentCountMessages);

  setInterval(()=>{
  bringMessages(currentCountMessages);
},6000)
}


buttonList.addEventListener('click',function(){
  listMessages.innerHTML=''
  count=0
  if(!document.querySelector('div.viewMore button')){
    divButton.innerHTML=`
    <button onclick='viewMore()'>Ver mais</button>
    `
    viewMoreButton = document.querySelector('div.viewMore button')
  }
  viewMore()
})
viewMoreButton.addEventListener('click',viewMore)



function bringMessages(action) {
  fetch(window.location.origin+`/message/list/number`, {
    method:'GET'
  }).then(resp => {
    return resp.json()
  }).then(data => {
    action(data)
  })
}

function modelarDados(dados,columns){
  let {messages,total,limit} = dados
  let finish = Math.ceil(total/limit)

  if(count == finish){
       viewMoreButton.remove()
  }

  for(let i = 0,round = Math.ceil((messages.length/columns)); i < round ;i++){  

          listMessages.innerHTML+=`
          <div class='col-12 messageDiv'>
            <div class='cont'>
              <div><h3><b>${messages[i].nome}</b></h3></div>
              <div class='messageDate'><span>${decideDate(messages[i].createdAt)}</span></div>
              </div>
              <div class='messageDescription'>
              <p>${messages[i].mensagem.length>50?messages[i].mensagem.slice(0,50)+'...':messages[i].mensagem}</p>
            </div>
          <div>`
  }
}

function sendData(pathURL,data,modelarDados){
  fetch(window.location.origin+pathURL,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
          'Content-type':'application/json'
      }
  }).then(response=>{
      return response.json()
  }).then(dados=>{

      modelarDados(dados,1)

  })
}

function viewMore(){
  count++

  sendData('/message/list',{
      count,
  },modelarDados)
}


function currentCountMessages(number){

  messageNumber.innerHTML = number

}



function decideDate(createDate){
  let date = new Date()
  let create = new Date(createDate)

  let months = [
  'janeiro','fevereiro','março','abril',
  'maio','junho','julho','agosto','setembro',
  'outubro','novembro','dezembro'
]

  let currentDate = {
    hour:date.getHours(),
    minutes:date.getMinutes(),
    day:date.getDate(),
    month:date.getMonth(),
    year:date.getFullYear()
  }

  let sendDate = {
    hour:create.getHours(),
    minutes:create.getMinutes(),
    day:create.getDate(),
    month:create.getMonth(),
    year:create.getFullYear()

  }
  let diffMinutes = currentDate.minutes-sendDate.minutes
  let diffHour = currentDate.hour-sendDate.hour
  let diffDay = currentDate.day-sendDate.day

  if(sendDate.minutes == currentDate.minutes
    &&sendDate.hour==currentDate.hour
    &&sendDate.day==currentDate.day 
    &&sendDate.month==currentDate.month
    &&sendDate.year==currentDate.year
    ){

      return 'Agora'

    }else if(sendDate.hour==currentDate.hour
    &&sendDate.day==currentDate.day 
    &&sendDate.month==currentDate.month
    &&sendDate.year==currentDate.year
    ){
      if(diffMinutes==1){
        return '1min atrás'
      }

      return `Há ${diffMinutes} minutos`

  }else if(sendDate.day==currentDate.day
    &&sendDate.month==currentDate.month
    &&sendDate.year==currentDate.year){

      if(diffHour==1){
        return '1h atrás'
      }

      return `Há ${diffHour} horas`

    }else if(sendDate.month==currentDate.month
      &&sendDate.year==currentDate.year){

        if(diffDay==1){
          return 'Ontem'
        }

      return `Há ${diffDay} dias`

    }else if(sendDate.year == currentDate.year){

      return `${sendDate.day} de ${months[sendDate.month]}`

    }else if(sendDate.year !== currentDate.year){
      return `${sendDate.day} de ${months[sendDate.month]} de ${sendDate.year}`
    }

}