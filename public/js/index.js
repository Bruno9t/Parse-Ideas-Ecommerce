const buttonNext = document.querySelector('.next');
const formContact  = document.querySelector('.form-contact');


// Campos do formContact
let name = formContact.name;
let email = formContact.email;
let subject = formContact.subject;
let message = formContact.message;

let url = window.location.origin + '/contact';
let fields = document.querySelectorAll('[required]');

formContact.addEventListener('submit', async function(e){
    e.preventDefault();
    const formData = new FormData(this);

    // console.log(formData.get('description'));
        let result = await fetch(`${url}`,{
            method: 'POST',
            body: formData
        })
    
        result = await result.json();

        if(result.msg == 'success'){
          divErros.style.display = 'none';
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Parabéns, anúncio criado com sucesso!',
                showConfirmButton: false,
                timer: 3000
            })

            setTimeout(() => {
              window.location.reload();
            }, 3000)

            
        }
        else{
            divErros.style.display = 'none';
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Que pena, não foi possível criar o anúncio!',
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