const formContact  = document.formContact;


// Campos do formContact
let name = formContact.contactName;
let email = formContact.contactEmail;
let subject = formContact.contactSubject;
let message = formContact.contactMessage;

let url = window.location.origin + '/contact';
let fields = document.querySelectorAll('[required]');

formContact.addEventListener('submit', async function(e){
    e.preventDefault();

    const form = new FormData();
    form.append('name', name.value);
    form.append('email', email.value);
    form.append('subject', subject.value);
    form.append('message', message.value);

    const data = {
        name: form.get('name'),
        email: form.get('email'),
        subject: subject[form.get('subject')].textContent,
        message: form.get('message'),
    }

    
        let result = await fetch(`${url}`,{ 
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

            result = await result.json();

            if(result.msg == 'success'){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Contato enviado com sucesso!!',
                    showConfirmButton: false,
                    timer: 300000
                })
            }else if(result.msg == 'error'){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Que pena, não foi possível enviar o contato!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
})


function validateField(field){

  function verifyErrors(){
      let foundError = false;

      for(let error in field.validity){
         
          if(field.validity[error] && !field.validity.valid){
              foundError = error;
          }
      }        

      return foundError;
  }

  function customMessage(typeError){
      const messages = {
          text: {
              valueMissing: "Por favor, preencha este campo"
          },
          email:{
              valueMissing: "Email é obrigatório",
              typeMismatch: "Por favor, preencha um email válido"
          },
          textarea: {
            valueMissing: "Por favor, preencha a descrição do anúncio",
          }
      }

      return messages[field.type][typeError]
  }

  function setCustomMessage(message){

      const spanError = field.parentNode.querySelector('span.error');

      if(message){
          spanError.classList.add('active');
          spanError.innerHTML = message;
      }else{
          spanError.classList.remove('active');
          spanError.innerHTML = '';
      }

  }

  return function(){
      const error = verifyErrors()
      
      if(error){
          const message = customMessage(error)
          const label = field.parentNode.querySelector('label');
          // label.classList.add('label-error')
          field.style.borderColor = "red"
          setCustomMessage(message);
      }else{
          field.style.borderColor = "green"
          // label.classList.remove('.label-error')
          setCustomMessage();
      }
  };
}

function customValidation(e){

  const field = event.target;
  const validation = validateField(field);

  validation();
  
}

for( let field of fields ){
  field.addEventListener("invalid", event => {
      //Eliminar mensagem padrão nos inputs
      event.preventDefault();
      customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}