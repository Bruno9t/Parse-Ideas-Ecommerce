const buttonNext = document.querySelector('.next');
const form  = document.querySelector('form');
const divErros = document.querySelector('#erros');

// Campos do form
let idAnuncio = form.id;
let fotoID = form.idFoto;
let pdfID = form.idPdf;
let tituloAnuncio = form.title;
let tipoDoNegocio = form.type;
let preco = form.price;
let estoque = form.stock;
let faturamentoMedio = form.revenues;
let lucroMedio = form.profit;
let idade = form.age;
let motivoVenda = form.reason;
let qtdFuncionarios = form.employees;
let descricao = form.querySelector('textarea');
let fileFoto = form.foto;
let filePdf = form.pdf;
let fields = document.querySelectorAll('[required]');

$(document).ready(function($){
  $(preco).mask('000.000.000.000.000,00', {reverse: true});
  $(estoque).mask('000.000.000.000.000,00', {reverse: true});
  $(faturamentoMedio).mask('000.000.000.000.000,00', {reverse: true});
  $(lucroMedio).mask('000.000.000.000.000,00', {reverse: true});
});


const url = `${window.location.origin}/announcements/update/${idAnuncio}?_method=PUT`;

form.addEventListener('submit', async function(e){
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
                title: 'Anúncio atualizado!',
                showConfirmButton: false,
                timer: 3000
            })
            
        }else if(result.msg == 'errors'){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Que pena, não foi possível atualizar o anúncio!',
                showConfirmButton: false,
                timer: 3000
            })
            divErros.style.display = 'block';
            divErros.innerHTML = ''
            let erros = result.erros;

            erros.forEach(erro => {

              divErros.innerHTML += `<p><strong>${erro.msg}</strong></p>`
                
            })
        }
        else{
            divErros.style.display = 'none';
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Que pena, não foi atualizar o anúncio!',
                showConfirmButton: false,
                timer: 3000
            })
        }

})

document.querySelector('#input-foto').addEventListener('change',function(e){
  let span = document.querySelector('.desc-file-foto');
  span.innerHTML = '';
  let inputText = this.files[0].name;
  span.innerHTML += `<p>Imagem: ${inputText}</p>`; 

  let image = document.querySelector('#label-1 img');
  let reader = new FileReader()
    reader.onload = function(e){
        image.src = e.target.result
    }
    reader.readAsDataURL(e.target.files[0]);
})

document.querySelector('#input-pdf').addEventListener('change',function(e){
  let span = document.querySelector('.desc-file-pdf');
  span.innerHTML = '';
  let inputText = this.files[0].name;
  span.innerHTML += `<p>PDF: ${inputText}</p>`; 
})

function validateField(field){

  function verifyErrors(){
      let foundError = false;

      for(let error in field.validity){
          //se não for custom error
          //verifica se tem erro

          //usada para alterar a mensagem padrão de erro do input    
          // if(error !== "customError" && field.validity[error]){
          //     foundError = error;
          // }

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
          number:{
            valueMissing: "Por favor, preencha este campo"
          },
          date:{
            valueMissing: "Por favor, preencha este campo",
            typeMismatch: "Por favor, informe uma data válida",
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

