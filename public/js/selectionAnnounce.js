// let message = document.querySelector('#message-error'); 

//     document.querySelector('#btn-submit').addEventListener('click',(event)=>{
//         message.innerHTML = ''
//         event.preventDefault()
//         let id_categoria = localStorage.getItem('id_category')
//         let id_plano = localStorage.getItem('id_plan')
//         let data = {
//             id_categoria,
//             id_plano
//         } 
//         let pathURL = 'http://' + window.location.host + '/plans/list'
//         if(id_categoria && id_plano){
//             // console.log(`id_categoria: ${id_categoria}, id_plano: ${id_plano}`)
//                 let config = {
//                     method:'post',
//                     body:JSON.stringify(data),
//                     headers:{
//                         'Content-Type': 'application/json',
//                 }
//             }
//             fetch(pathURL,config)
//             .then(response => {
//                 return response.json()
//             }).then(datas => {
//                 console.log(datas)
//             }).catch(function(err){
//                 console.log(err)
//             })
//             let url = window.location.origin
//             window.location.href = `${url}/auth/access}`;
            
//         }else{
//             message.innerHTML = 'Por favor selecione um tipo de negócio e um plano'
//         }

//     })

//     document.querySelectorAll('.form-check-input').forEach((item)=> {
//         item.addEventListener('click', (event) => {
//            var id_category = event.target.getAttribute('value')
//            localStorage.setItem( 'id_category', id_category)
//            // console.log(id_category);
//         })
//     })

//     document.querySelectorAll('#teste').forEach((item)=>{
//         item.addEventListener('click', (event)=>{
//           item.style.backgroundColor = "#5A47CC";
//           item.style.color = "#fff";
//           var id_plan = event.target.getAttribute('data-key')
//           localStorage.setItem( 'id_plan', id_plan)
//         // console.log(id_plan);
//         })
               
//     })
