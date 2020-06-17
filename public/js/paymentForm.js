recurly.configure('ewr1-zz9sjSgt6sL0e8ZniXA4ye');

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
        
        form.submit();
      }
    });
  });