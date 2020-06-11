 let message = document.querySelector('#message-error'); 

    document.querySelector('#btn-submit').addEventListener('click',(event)=>{
        message.innerHTML = ''
        event.preventDefault()
        let id_categoria = sessionStorage.getItem('id_category')
        let id_plano = sessionStorage.getItem('id_plan')

        if(id_categoria && id_plano){
            console.log(`id_categoria: ${id_categoria}, id_plano: ${id_plano}`)
            let url = window.location.origin
            window.location.href = `${url}/auth/access}`;
            
        }else{
            message.innerHTML = 'Por favor selecione um tipo de negócio e um plano'
        }
    })

    document.querySelectorAll('.form-check-input').forEach((item)=> {
        item.addEventListener('click', (event) => {
           var id_category = event.target.getAttribute('value')
           sessionStorage.setItem('id_category', id_category)
        })
    })

    document.querySelectorAll('#teste').forEach((item)=>{
        item.addEventListener('click', (event)=>{
           item.classList.toggle('bg_button')
           var id_plan = event.target.getAttribute('data-key')
        //    console.log(`Plano Selecionado ${id_plan}`)
        sessionStorage.setItem('id_plan', id_plan)
        })
               
    })