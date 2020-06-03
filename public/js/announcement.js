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

// buttonNext.addEventListener('click', (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', tituloAnuncio.value);
//     formData.append('type', tipoDoNegocio.options[tipoDoNegocio.selectedIndex].text);
//     formData.append('price', preco.value);
//     formData.append('stock', estoque.value);
//     formData.append('revenues', faturamentoMedio.value);
//     formData.append('profit', lucroMedio.value);
//     formData.append('age', idade.value);
//     formData.append('reason', motivoVenda.value);
//     formData.append('employees', qtdFuncionarios.value);
//     formData.append('description', descricao.value);
//     formData.append('foto', fileFoto.files[0]);
//     formData.append('pdf', filePdf.files[0]);

//     console.log(formData.get('employees'));
    
//     fetch(`${url}`,{
//         method: 'POST',
//         headers: new Headers({'Content-Type': 'multipart/form-data'}),
//         mode: 'no-cors',
//         body: formData
//     }).then(resp => {
//         resp.json;
//     }).then(data => {
//         console.log(data);
//         Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Your work has been saved',
//         showConfirmButton: false,
//         timer: 3000
//       })
//     }).catch(erro => {
//         console.log('Não deu certo ' + erro)
//     })

//     const obj = {
//         titulo: tituloAnuncio.value,
//         tipo: tipoDoNegocio.options[tipoDoNegocio.selectedIndex].text,
//         preco: preco.value,
//         estoque: estoque.value,
//         faturamentoMedio: faturamentoMedio.value,
//         lucroMedio: lucroMedio.value,
//         idade: idade.value,
//         motivoVenda: motivoVenda.value,
//         qtdFuncionarios: qtdFuncionarios.value,
//         descricao: descricao.value
//     }

//     // console.log(formData);
    
// })

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
                timer: 333000
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Que pena, não foi possível criar o anúncio!',
                showConfirmButton: false,
                timer: 333000
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