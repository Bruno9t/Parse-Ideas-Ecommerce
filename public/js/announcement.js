const buttonNext = document.querySelector('.next');
const form  = document.querySelector('form');

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
let fileFoto = form.pdf
let filePdf = form.foto;


// Masking input element to money.
VMasker(preco).maskMoney({
    // Decimal precision -> "90"
    precision: 2,
    // Decimal separator -> ",90"
    separator: ',',
    // Number delimiter -> "12.345.678"
    delimiter: '.',
    // Money unit -> "R$ 12.345.678,90"
    unit: 'R$',
    // Money unit -> "12.345.678,90 R$"
    //suffixUnit: 'R$',
    // Force type only number instead decimal,
    // masking decimals with ",00"
    // Zero cents -> "R$ 1.234.567.890,00"
    zeroCents: true
  });

  VMasker(estoque).maskMoney({
    // Decimal precision -> "90"
    precision: 2,
    // Decimal separator -> ",90"
    separator: ',',
    // Number delimiter -> "12.345.678"
    delimiter: '.',
    // Money unit -> "R$ 12.345.678,90"
    unit: 'R$',
    // Money unit -> "12.345.678,90 R$"
    //suffixUnit: 'R$',
    // Force type only number instead decimal,
    // masking decimals with ",00"
    // Zero cents -> "R$ 1.234.567.890,00"
    zeroCents: true
  });

  VMasker(faturamentoMedio).maskMoney({
    // Decimal precision -> "90"
    precision: 2,
    // Decimal separator -> ",90"
    separator: ',',
    // Number delimiter -> "12.345.678"
    delimiter: '.',
    // Money unit -> "R$ 12.345.678,90"
    unit: 'R$',
    // Money unit -> "12.345.678,90 R$"
    //suffixUnit: 'R$',
    // Force type only number instead decimal,
    // masking decimals with ",00"
    // Zero cents -> "R$ 1.234.567.890,00"
    zeroCents: true
  });

  VMasker(lucroMedio).maskMoney({
    // Decimal precision -> "90"
    precision: 2,
    // Decimal separator -> ",90"
    separator: ',',
    // Number delimiter -> "12.345.678"
    delimiter: '.',
    // Money unit -> "R$ 12.345.678,90"
    unit: 'R$',
    // Money unit -> "12.345.678,90 R$"
    //suffixUnit: 'R$',
    // Force type only number instead decimal,
    // masking decimals with ",00"
    // Zero cents -> "R$ 1.234.567.890,00"
    zeroCents: true
  });


const url = 'http://' + window.location.host + '/announcements/create';

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
            console.log(result);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Parabéns, anúncio criado com sucesso!',
                showConfirmButton: false,
                timer: 3000
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Que pena, não foi possível criar o anúncio!',
                showConfirmButton: false,
                timer: 3000
            })
        }


    // then(data => {
    //     console.log(data.teste);
    //     Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Your work has been saved',
    //     showConfirmButton: false,
    //     timer: 3000
    //   })
    // }).catch(erro => {
    //     console.log('Não deu certo ' + erro)
    // })
})