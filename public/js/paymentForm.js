recurly.configure('ewr1-zz9sjSgt6sL0e8ZniXA4ye');


let urlSplit = window.location.href.split('/')
let planCodeParam = urlSplit[urlSplit.length-1]
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

