let messagePreview = document.getElementById("message-preview")
let buttonList = document.getElementById('viewMessages')
let messageNumber = document.getElementById('messageNumber')
let divButton = document.querySelector('div.viewMore')
let viewMoreButton = document.querySelector('div.viewMore button')
let accord2 = document.getElementById('accordion2')
let messageContent= document.getElementById('message-content')

let modallong = document.getElementById('exampleModalLong')
let count=0;


//scroll

messagePreview.addEventListener("click",function(){
  if((window.innerHeight-messageContent.getBoundingClientRect().bottom)>0 ){
    messageContent.style.top = `${modallong.scrollTop-58}px`

}else{
  messageContent.style.top = `0px`
}
})


modallong.addEventListener('scroll',function(){

  if((messageContent.offsetHeight<window.innerHeight) ){
      return messageContent.style.top = `${modallong.scrollTop-58}px`
  }else if((messageContent.getBoundingClientRect().top > 0)){
    return messageContent.style.top = `${modallong.scrollTop-60}px`
  }

})

//

window.onload = function() {
  bringMessages(currentCountMessages);

  setInterval(()=>{
  bringMessages(currentCountMessages);
},6000)
}


buttonList.addEventListener('click',function(){
 messagePreview.innerHTML=''
  messageContent.innerHTML=''
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


  if(count == finish || total == 0){
       viewMoreButton.remove()
  }

  for(let i = 0,round = Math.ceil((messages.length)); i < round ;i++){  

    messagePreview.innerHTML+=`
     <div class="card">
     <div class="card-header" id="heading-${i+((count-1)*limit)}" data-toggle="collapse" data-target="#collapse-${i+((count-1)*limit)}" aria-expanded="false" aria-controls="collapse-${i+((count-1)*limit)}">
     <div class='col-12 messageDiv'>
       <div class='cont'>
         <div><h3><b>${messages[i].nome}</b></h3></div>
         <div class='messageDate'><span>${decideDate(messages[i].createdAt)}</span></div>
         </div>
         <div class='messageDescription'>
         <p>${messages[i].mensagem.length>50?messages[i].mensagem.slice(0,50)+'...':messages[i].mensagem}</p>
       </div>
     <div>
     </div>
     `
}

  for(let i = 0,round = Math.ceil((messages.length)); i < round ;i++){

    console.log(i+((count-1)*limit))

    messageContent.innerHTML += `
    <div id="collapse-${i+((count-1)*limit)}" class="collapse" aria-labelledby="heading-${i+((count-1)*limit)}" data-parent="#accordion2">
          <div class="card-body">
          <h3>${messages[i].nome}</h3>
          <h4>${messages[i].telefone}</h4>
          <h4>${messages[i].celular}</h4>
          <h4>${messages[i].email}</h4>
              <p>${i+((count-1)*limit)}-${messages[i].mensagem}</p>
              <button class="btn btn-primary" data-toggle="collapse" data-target="#collapse-${i+((count-1)*limit)}" aria-expanded="false" aria-controls="collapse-${i+((count-1)*limit)}">Fechar</button>
            </div>
                    
    </div>
    `
    
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

      return `${sendDate.hour<10?'0'+sendDate.hour:sendDate.hour}:${sendDate.minutes<10?'0'+sendDate.minutes:sendDate.minutes}`

    }else if(sendDate.month==currentDate.month
      &&sendDate.year==currentDate.year){

        if(diffDay==1){
          return `Ontem às ${sendDate.hour<10?'0'+sendDate.hour:sendDate.hour}:${sendDate.minutes<10?'0'+sendDate.minutes:sendDate.minutes}` 
        }else if(diffDay ==2 || diffDay ==3){
          return `Há ${diffDay} dias`
        }

      return `Dia ${sendDate.day} às ${sendDate.hour<10?'0'+sendDate.hour:sendDate.hour}:${sendDate.minutes<10?'0'+sendDate.minutes:sendDate.minutes}`

    }else if(sendDate.year == currentDate.year){

      return `${sendDate.day} de ${months[sendDate.month]}`

    }else if(sendDate.year !== currentDate.year){
      return `${sendDate.day} de ${months[sendDate.month]} de ${sendDate.year}`
    }

}