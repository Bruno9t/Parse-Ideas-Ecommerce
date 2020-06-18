recurly.configure('ewr1-zz9sjSgt6sL0e8ZniXA4ye');


let urlSplit = window.location.href.split('/')
let planCodeParam = urlSplit[urlSplit.length-1]
let countrysSelect = document.getElementById('billing_info_country')


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


  document.querySelector('#my-form').addEventListener('submit', function (event) {
    const form = this;
    event.preventDefault();

    recurly.token(elements, form, function (err, token) {
      if (err) {

        console.log('Deu erro:',err.fields)
      } else {

        console.log(token)
    
        sendData(`/plans/sign/${planCodeParam}`,{
            token
        })
      }
    });
  });

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
        
        console.log(dataDecoded)
    })

  }


  function appendCountrys(countrys){

    let countryList = countrys.map(country=>{
      return {
        name:solveCountryASCII(country.translations.pt),
        alpha2Code:country.alpha2Code
      }
    })


   
    let countryListSorted = countryList.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0
    })

    countryListSorted.forEach(countryInList=>{
      countrysSelect.innerHTML +=`
        <option value=${countryInList.alpha2Code} >${countryInList.name}</option>
      `
    })

  }

  function searchCountrys(){
    fetch('https://restcountries.eu/rest/v2/all?fields=translations;alpha2Code')
    .then(response=>response.json())
    .then(data=>{
      
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