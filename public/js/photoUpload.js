let formPhoto = document.getElementById('form-photo')

let fileInput = document.getElementById('input-image')

let image = document.querySelector('div#exampleModal3 figure img.card-img-top')


fileInput.addEventListener('change',function(e){

    console.log(e.target.value)

    let reader = new FileReader()

    reader.onload = function(e){
        image.src = e.target.result
    }

    reader.readAsDataURL(e.target.files[0]);
})


formPhoto.addEventListener('submit',function(e){
    e.preventDefault()


})