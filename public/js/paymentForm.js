recurly.configure('ewr1-zz9sjSgt6sL0e8ZniXA4ye');


let urlSplit = window.location.href.split('/')
let planCodeParam = urlSplit[urlSplit.length-1]
let countrysSelect = document.getElementById('billing_info_country')
let divAddress = document.getElementById('local-address')
let postalCodeInput = document.getElementById('postalInput')
let addressInput = document.getElementById('addressInput')
let cityInput = document.getElementById('cityInput')
let paymentDiv = document.getElementById('pay-info')
let animation = document.querySelector('div.animation')
let animationWrapper = document.querySelector('div.animation-wrapper div.animation-image') 
let animationMessage = document.querySelector('div.text-content p')
let countryCode;


const elements = recurly.Elements();
const cardElement = elements.CardElement({
    style: {
    inputType: 'mobileSelect',
      placeholder: {
        color: 'gray !important',
        fontWeight: 'bold',
        content: {
          number: 'Número do cartão',
          cvv: 'CVV',
          expiry:'Mês/Ano '
        }
      },
      invalid: {
        fontColor: 'red'
      }
    }
  });

  cardElement.attach('#recurly-elements');

let count=0

  document.querySelector('#my-form').addEventListener('submit', function (event) {
    const form = this;
    event.preventDefault();

    recurly.token(elements, form, function (err, token) {
      if (err) {

        console.log('Deu erro:',err.fields)
      } else {

        startAnimation('Processando sua assinatura...')

        sendData(`/plans/sign/${planCodeParam}`,{
            token
        })
      }
    });
  });

  countrysSelect.addEventListener('change',function(e){

    if(!e.target.value){
      clearAddress()
      closeAddressDiv()
      count=0
      // return divAddress.style.display = 'none'
    }else{
      clearAddress()
      countryCode = e.target.value

      if(count==0){
        openAddressDiv()
        count++
      }
      // return divAddress.style.display = 'block'


    }
    
  })

  // postalCodeInput.addEventListener('blur',function(e){
  //   searchDataByPostalCode(countryCode,e.target.value)
  // })



  window.addEventListener('load',function(){
    searchCountrys()
  })



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
          return stopAnimation()
        },3000)
        
        console.log(dataDecoded)
    })

  }


  function appendCountrys(countrys){

    let countryList = countrys.map(country=>{
      return {
        name:solveCountryASCII(country.translations.pt),
        alpha2Code:country.alpha2Code,
        flag:country.flag
      }
    })


   
    let countryListSorted = countryList.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0
    })

    countryListSorted.forEach(countryInList=>{
      countrysSelect.innerHTML +=`
        <option value=${countryInList.alpha2Code} ><span class="flag-icon flag-icon-ar"></span> ${countryInList.name}</option>
      `
    })

  }

  // function appendAddressInformation(searchedAddress){

  //   if(searchedAddress.length){
  //     console.log(searchedAddress)
  //     addressInput.value = searchedAddress[0].street
  //     cityInput.value = searchedAddress[0].posttown+'/'+searchedAddress[0]
  //     return true
  //   }else{
  //     console.log('erro',searchedAddress)
  //     return false
  //   }


  // }

  function searchCountrys(){
    fetch('https://restcountries.eu/rest/v2/all?fields=translations;alpha2Code;flag')
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      appendCountrys(data)

    })
  }

  function solveCountryASCII(countryName){

    if(countryName=='áustria'){
      return 'Austria'
    }else if(countryName=='Índia'){
      return 'India'
    }else{
      return countryName
    }

  }

  // function searchDataByPostalCode(clientCountryCode,clientPostalCode){
  //   fetch(`https://ws.postcoder.com/pcw/PCW34-636C7-SW7BN-DLTF4/address/${clientCountryCode}/${clientPostalCode}?identifier=Allies%20My%20Account%20-%20Tools&lines=3&exclude=organisation,posttown,county,postcode,country`)
  //   .then(response=>response.json())
  //   .then(data=>{
  //     appendAddressInformation(data)
  //   })
  // } 

  function clearAddress(){
    addressInput.value = ''
    cityInput.value = ''
    postalCodeInput.value = ''
    return true
  }

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
  addPay()
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

function oppeningAddressDiv(timeStamps){

  console.log('oppening')

  if(!start) start=timeStamps

  let progress = timeStamps - start

  // height = height + (200/4500)*progress

  divAddress.style.height = Math.min(progress*(195/450), 195) + 'px'

  console.log(divAddress.style.height)

  if(progress < 450){
    return window.requestAnimationFrame(oppeningAddressDiv)
  }

  addOpacity()

}

function closingAddressDiv(timeStamps){

  if(!start) start=timeStamps

  let progress = timeStamps - start

  // height = height - (200/25)

  console.log(progress)

  divAddress.style.height = Math.max(195-(progress*(195/500)), 0) + 'px'

  console.log(divAddress.style.height)

  if(progress < 500){
    return window.requestAnimationFrame(closingAddressDiv)
  }

  divAddress.style.display = 'none'

}

function addingOpacity(timeStamps){
  console.log('ok')

  if(!start) start=timeStamps

  let progress = timeStamps - start

  // height = height + (200/4500)*progress

  divAddress.style.opacity = `${(Math.min(progress*(100/400), 100))}%`

  console.log(divAddress.style.opacity)

  if(progress < 400){
    window.requestAnimationFrame(addingOpacity)
  }
}

function removingOpacity(timeStamps){
  if(!startParal) startParal=timeStamps

  let progress = timeStamps - startParal

  // height = height + (200/4500)*progress

  divAddress.style.opacity = `${(Math.max(100-progress*0.25, 0))}%`

  console.log(divAddress.style.opacity)

  if(progress < 400){
    window.requestAnimationFrame(removingOpacity)
  }
}


function openAddressDiv(){
  start=null
  divAddress.style.display = 'block'
  window.requestAnimationFrame(oppeningAddressDiv)  
}

function closeAddressDiv(){
  start=null
  removeOpacity()
  window.requestAnimationFrame(closingAddressDiv)
}

function addOpacity(){
  start = null
  window.requestAnimationFrame(addingOpacity)
}

function removeOpacity(){
  startParal=null
  window.requestAnimationFrame(removingOpacity)
}