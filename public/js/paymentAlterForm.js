// recurly.configure('ewr1-zz9sjSgt6sL0e8ZniXA4ye');


let urlSplit = window.location.href.split('/')
let planCodeParam = urlSplit[urlSplit.length-1]
// let countrysSelect = document.getElementById('billing_info_country')
// let divAddress = document.getElementById('local-address')
// let postalCodeInput = document.getElementById('postalInput')
// let addressInput = document.getElementById('addressInput')
// let cityInput = document.getElementById('cityInput')
let paymentDiv = document.getElementById('pay-info')
let animation = document.querySelector('div.animation')
// let cardNumber = document.querySelector('div#recurly-elements div.recurly-element.recurly-element-card')
// let firstName = document.getElementById('nameInput')
// let lastName = document.getElementById('surnameInput')
let animationWrapper = document.querySelector('div.animation-wrapper div.animation-image') 
let animationMessage = document.querySelector('div.text-content p')
// let countryCode;

// let cepError = document.getElementById('cep-error')
// let cardError = document.getElementById('card-error')
// let firstNameError = document.getElementById('first-name-error')
// let lastNameError = document.getElementById('last-name-error')
// let cityError = document.getElementById('city-error')
// let addressError = document.getElementById('address-error')

// let li;


// const elements = recurly.Elements();
// const cardElement = elements.CardElement({
//     style: {
//     inputType: 'mobileSelect',
//       placeholder: {
//         color: 'gray !important',
//         fontWeight: 'bold',
//         content: {
//           number: 'Número do cartão',
//           cvv: 'CVV',
//           expiry:'Mês/Ano '
//         }
//       },
//       invalid: {
//         fontColor: 'red'
//       }
//     }
//   });

//   cardElement.attach('#recurly-elements');

// let count=0

  document.querySelector('#my-form').addEventListener('submit', function (event) {
    // const form = this;
    event.preventDefault();

    // recurly.token(elements, form, function (err, token) {
    //   if (err) {

    //     console.log(err.fields)

    //     err.fields.forEach(field=>{
    //       if(field =='number' || field=='month' || field=='year' ){
    //         return criarErro(cardError,{
    //           msg:'Cartão inválido!'
    //         })
    //       }else if(field=='first_name'){
    //         firstName.style.border = '1px #E05D54 solid'
    //         return criarErro(firstNameError,{
    //           msg:'Digite seu nome!'
    //         })
    //       }else if(field=='last_name'){
    //         lastName.style.border = '1px #E05D54 solid'
    //         return criarErro(lastNameError,{
    //           msg:'Digite seu sobrenome!'
    //         })
    //       }else if(field == 'city'){
    //         cityInput.style.border = '1px #E05D54 solid'
    //         return criarErro(cityError,{
    //           msg:'Digite o nome da sua cidade!'
    //         })
    //       }else if(field=='address1'){
    //         return criarErro(addressError,{
    //           msg:'Digite o seu endereço!'
    //         })
    //       }
    //     })


        
    //   } else {

        // if(postalCodeInput.value.length==''){
        //   postalCodeInput.style.border = '1px #E05D54 solid'
        //   return criarErro(cepError,{
        //     msg:'Digite algum valor!'
        //   })
        // }

        // if(postalCodeInput.value.length<8){
        //   postalCodeInput.style.border = '1px #E05D54 solid'
        //   return criarErro(cepError,{
        //     msg:'Precisa ter pelo menos 8 dígitos!'
        //   })
        // }

        // postalCodeInput.style.border = '1px #f2f2f2 solid'
        // limparErro(cepError)



        startAnimation('Alterando sua assinatura...')

        sendData(`/plans/alter/sign`,{
            plan_code:planCodeParam
        })
    //   }
    // });
  });

//   countrysSelect.addEventListener('change',function(e){

//     if(!e.target.value){
//       clearAddress()
//       closeAddressDiv()
//       count=0
//       // return divAddress.style.display = 'none'
//     }else{
//       clearAddress()
//       countryCode = e.target.value

//       if(count==0){
//         openAddressDiv()
//         count++
//       }
  
//       if(e.target.value=='BR'){
//         console.log('adiciona')
//         postalCodeInput.onblur = function(e){

//           if(postalCodeInput.value.length==''){
//             postalCodeInput.style.border = '1px #E05D54 solid'
//             return criarErro(cepError,{
//               msg:'Digite algum valor!'
//             })
//           }
  
//           if(postalCodeInput.value.length<8){
//             postalCodeInput.style.border = '1px #E05D54 solid'
//             return criarErro(cepError,{
//               msg:'Precisa ter pelo menos 8 dígitos!'
//             })
//           }

//           postalCodeInput.style.border = '1px #f2f2f2 solid'
//           limparErro(cepError)



//           searchDataByPostalCode(e.target.value)
//         }

//         return postalCodeInput.onkeypress = function (e){
//           return isNum(e)
//         }
//       }else{
//         if(postalCodeInput.onblur){
//           console.log('remove')
//           postalCodeInput.onblur = ''
//           postalCodeInput.onkeypress = ''
//         }
//       }
//       // return divAddress.style.display = 'block'


//     }
    
//   })



//   window.addEventListener('load',function(){
//     searchCountrys()
//   })



  function sendData(pathURL,dataToSend){
    let config = {
        method:'POST',
        body:JSON.stringify(dataToSend),
        headers:{
            "Content-Type":"application/json"
        }
    }

    fetch(window.location.origin+pathURL,config)
    .then(response => response.json())
    .then(dataDecoded => {

        setTimeout(function(){
          stopAnimation()
          showResultScreen(dataDecoded)
        },3000)
    })

  }


//   function appendCountrys(countrys){

//     let countryList = countrys.map(country=>{
//       return {
//         name:solveCountryASCII(country.translations.pt),
//         alpha2Code:country.alpha2Code,
//       }
//     })


   
//     let countryListSorted = countryList.sort(function(a, b){
//       if(a.name < b.name) { return -1; }
//       if(a.name > b.name) { return 1; }
//       return 0
//     })

//     countryListSorted.forEach(countryInList=>{
//       countrysSelect.innerHTML +=`
//         <option value=${countryInList.alpha2Code} ><span class="flag-icon flag-icon-ar"></span> ${countryInList.name}</option>
//       `
//     })

//   }

//   function appendAddressInformation(searchedAddress){

//     if(searchedAddress){
//       console.log(searchedAddress)
//       addressInput.value = searchedAddress.logradouro+'/'+searchedAddress.bairro
//       cityInput.value = searchedAddress.localidade
//       return true
//     }else{
//       console.log('erro',searchedAddress)
//       return false
//     }
//   }

//   function searchCountrys(){
//     fetch('https://restcountries.eu/rest/v2/all?fields=translations;alpha2Code;')
//     .then(response=>response.json())
//     .then(data=>{
//       console.log(data)
//       appendCountrys(data)

//     })
//   }

//   function solveCountryASCII(countryName){

//     if(countryName=='áustria'){
//       return 'Austria'
//     }else if(countryName=='Índia'){
//       return 'India'
//     }else{
//       return countryName
//     }
//   }


//   function searchDataByPostalCode(clientPostalCode){
//     fetch(`https://viacep.com.br/ws/${clientPostalCode}/json/`,{
//       headers:{
//         'Access-Control-Request-Headers': 'origin'
//       }

//     })
//     .then(response=>response.json())
//     .then(data=>{

//       if(data.erro){
//         return criarErro(postalCodeInput,cepError,{
//             msg:'Valor inválido!'
//           })
//       }
      
//       appendAddressInformation(data)

//     })
//     .catch((err)=>{
//       return criarErro(postalCodeInput,cepError,{
//         msg:'Valor inválido!'
//       })
//     })
//   }
  
//   function criarErro(errorList,error){

//     li = document.createElement('p')
//     li.setAttribute('style',
//     'font-size:13px')
//     limparErro(errorList)

//     li.innerHTML = `
//     <b style='color:red'>${error.msg}</b>
//     `
//     errorList.appendChild(li)

// }

//   function limparErro(listaDeErros){
//     if(listaDeErros!=undefined){
//         return listaDeErros.innerHTML=''
//     }

//     return true;
// }

//   function clearAddress(){
//     addressInput.value = ''
//     cityInput.value = ''
//     postalCodeInput.value = ''
//     return true
//   }

  function removePay(){
    return paymentDiv.style.display='none'
  }

  function addPay(){
    return paymentDiv.style.display='block'
  }

function startAnimation(messageForUser){
  removePay()
  animationWrapper.classList.add('start')
  showScreenAnimation()
  animationMessage.innerText = messageForUser
  return true;
}

function stopAnimation(){
  removeScreenAnimation()
  animationWrapper.classList.remove('start')
  return true;
}

function showScreenAnimation(){
  return animation.classList.add('show');
}

let start = null;
let startParal=null
let height = 0;

function removeScreenAnimation(){
  return animation.classList.remove('show')
}

// function oppeningAddressDiv(timeStamps){

//   if(!start) start=timeStamps

//   let progress = timeStamps - start

//   // height = height + (200/4500)*progress

//   divAddress.style.height = Math.min(progress*(195/450), 195) + 'px'

//   if(progress < 450){
//     return window.requestAnimationFrame(oppeningAddressDiv)
//   }

//   addOpacity()

// }

// function closingAddressDiv(timeStamps){

//   if(!start) start=timeStamps

//   let progress = timeStamps - start

//   // height = height - (200/25)

//   divAddress.style.height = Math.max(195-(progress*(195/500)), 0) + 'px'

//   if(progress < 500){
//     return window.requestAnimationFrame(closingAddressDiv)
//   }

//   divAddress.style.display = 'none'

// }

// function addingOpacity(timeStamps){

//   if(!start) start=timeStamps

//   let progress = timeStamps - start

//   // height = height + (200/4500)*progress

//   divAddress.style.opacity = `${(Math.min(progress*(100/400), 100))}%`

//   if(progress < 400){
//     window.requestAnimationFrame(addingOpacity)
//   }
// }

// function removingOpacity(timeStamps){
//   if(!startParal) startParal=timeStamps

//   let progress = timeStamps - startParal

//   // height = height + (200/4500)*progress

//   divAddress.style.opacity = `${(Math.max(100-progress*0.25, 0))}%`

//   if(progress < 400){
//     window.requestAnimationFrame(removingOpacity)
//   }
// }


// function openAddressDiv(){
//   start=null
//   divAddress.style.display = 'block'
//   window.requestAnimationFrame(oppeningAddressDiv)  
// }

// function closeAddressDiv(){
//   start=null
//   removeOpacity()
//   window.requestAnimationFrame(closingAddressDiv)
// }

// function addOpacity(){
//   start = null
//   window.requestAnimationFrame(addingOpacity)
// }

// function removeOpacity(){
//   startParal=null
//   window.requestAnimationFrame(removingOpacity)
// }


// function OnlyNum(e)
// {
// 	var tecla=new Number();
// 	if(window.event) {
// 		tecla = e.keyCode;
// 	}
// 	else if(e.which) {
// 		tecla = e.which;
// 	}
// 	else {
// 		return true;
// 	}
// 	if((tecla >= "97") && (tecla <= "122") || tecla==32){
// 		return false;
// 	}
// }

// function cepValidation(event,cepFormat){

  

// }

// function isNum(e)
// {

//   console.log(e.keyCode)
// 	var tecla=new Number();
// 	if(window.event) {
// 		tecla = e.keyCode;
// 	}
// 	else if(e.which) {
// 		tecla = e.which;
// 	}
// 	else {
// 		return true;
// 	}
//   if((tecla >= 97) && (tecla <= 122) ||
//   (tecla >= 65 && tecla <= 90)
//     || tecla==32){
// 		return false;
// 	}
// }

let resultScreen = document.querySelector('div.result-success')
let titleResult = document.querySelector('div.result-success div.title-content h2')
let messageResult = document.querySelector('div.result-success div.message-result-content>p')
let sentEmail = document.getElementById('sent-email')
let imageResult = document.querySelector('div.result-success div.image-result-content img')

function showResultScreen(data){

  console.log(data)

  if(data.error == 1){
    titleResult.innerText=`Não foi possível realizar a assinatura!`
    imageResult.src = '/images/svg/error.svg'
    messageResult.innerText=data.msg
  }else if(data.sub){
    localStorage.setItem('fired',1)
    titleResult.innerText=`Assinatura completa`
    imageResult.src = '/images/svg/tick.svg'
    sentEmail.innerText='Você receberá um email com os detalhes da assinatura.'
    messageResult.innerText=`Parabéns, você assinou o Plano ${data.sub.plan.name}.`
  }else{
    titleResult.innerText=`Houve um problema ao processar sua assinatura!`
    imageResult.src = '/images/svg/error.svg'
    messageResult.innerText=`Tente novamente mais tarde.`
  }

  return resultScreen.style.display = 'block'

}