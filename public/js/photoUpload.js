let formPhoto = document.querySelector('#form-photo')


let fileInput = document.querySelector('#input-image')

let image = document.querySelector('div#exampleModal3 figure img.card-img-top')
let photoErros = document.querySelector('#photoErros')

let list;


fileInput.addEventListener('change',function(e){

    let reader = new FileReader()

    reader.onload = function(e){
        image.src = e.target.result
    }

    reader.readAsDataURL(e.target.files[0]);
})


formPhoto.addEventListener('submit',function(e){
    e.preventDefault()

    let formData = new FormData()

    formData.append('file',fileInput.files[0])

    enviarDados('/photo/update?_method=PUT',formData)

})

function enviarDados(pathURL,data){

    let config = {
        method:'POST',
        body:data,
    }

    fetch(window.location.href+pathURL,config)
    .then(response => {
        return response.json()
    }).then(datas => {

        console.log(datas)

        if(datas.code==1){

            list = document.createElement('p')
            list.setAttribute('style',
            'font-size:13px;background:rgb(158, 235, 44);')
            limparErro(photoErros)

            list.innerHTML = `
            <b style='color:green'>${datas.msg}</b>
            `
            photoErros.appendChild(list)

            setTimeout(()=>{
                window.location.reload()
            },1000)

        }else if(datas.code==2){
            criarErro(photoErros,datas.msg)
        }else{
            criarErro(photoErros,'A foto não pode ter mais de 500kB')
        }           

    }).catch(function(err){
 
        return new Error(err)

    })

}

function criarErro(errorList,msg){
    list = document.createElement('p')
    list.setAttribute('style',
    'font-size:13px;')
    limparErro(errorList)

    list.innerHTML = `
    <b style='color:red'>${msg}</b>
    `
    errorList.appendChild(list)

}

function limparErros(listaDeErros){
    if(listaDeErros!=undefined){
        return listaDeErros.innerHTML=''
    }

    return true;
}