window.addEventListener('load',function(){
    console.log(localStorage.getItem('fired'))
    if(!Number(localStorage.getItem('fired'))){

        Swal.fire({
           position: 'center',
           icon: 'warning',
           title: 'Você ainda não possui uma assinatura, mas poderá criar um anúncio que ficará ativo por 3 dias.',
           showConfirmButton: true,
       })
   
       return localStorage.setItem('fired',1)
   }else{
       return false;
   }
})



