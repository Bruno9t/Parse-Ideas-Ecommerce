// let formPhoto = document.querySelector('#form-photo')
// var formPhoto = document.forms.namedItem("form-photo");

let fileInput = document.querySelector('#input-image')

let image = document.querySelector('div#exampleModal3 figure img.card-img-top')


fileInput.addEventListener('change',function(e){

    let reader = new FileReader()

    reader.onload = function(e){
        image.src = e.target.result
    }

    reader.readAsDataURL(e.target.files[0]);
})


// formPhoto.addEventListener('submit',function(e){
//     e.preventDefault()

//     let formData = new FormData()

//     formData.append('file',fileInput.files[0])

//     console.log(formData.entries())


//     enviarDados('/photo/update?_method=PUT',formData)

// })





// function enviarDados(pathURL,data){

//     let config = {
//         method:'POST',
//         body:data
//     }

//     fetch(window.location.href+pathURL,config)
//     .then(response => {
//         return response.json()
//     }).then(datas => {

//         console.log(datas)

//     }).catch(function(err){
 
//         console.log(err)

//     })

// }