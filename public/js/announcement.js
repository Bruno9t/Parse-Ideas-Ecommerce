const buttonNext = document.querySelector('.next');
const form  = document.querySelector('form');
const divErros = document.querySelector('#erros');

// Campos do form
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

$(document).ready(function($){
  $(preco).mask('000.000.000.000,00', {reverse: true});
  $(estoque).mask('000.000.000.000.000,00', {reverse: true});
  $(faturamentoMedio).mask('000.000.000.000.000,00', {reverse: true});
  $(lucroMedio).mask('000.000.000.000.000,00', {reverse: true});
});


const url = window.location.origin + '/announcements/create';

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
                title: 'Parabéns, anúncio criado com sucesso!',
                showConfirmButton: false,
                timer: 3000
            })
            
        }else if(result.msg == 'errors'){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Que pena, não foi possível criar o anúncio!',
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
                title: 'Que pena, não foi possível criar o anúncio!',
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

