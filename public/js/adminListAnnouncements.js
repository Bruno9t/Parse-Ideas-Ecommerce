let listAnnouncements = document.querySelector('div#contain div.announcements')
let listIndexPages = document.querySelector('div#contain div.announcements-navigation ul')
let liSelected;
let previousClickLI = 1;


 


window.addEventListener('load',function(){

    getDataFromServer('/user/announcements',{
        previousClickLI,
    },buildAnnouncemntsCardsOnAdmin)
})


listIndexPages.addEventListener('click',function(e){

    alterLastClickedElement(e.target)

    getDataFromServer('/user/announcements',{
        previousClickLI,
    },buildAnnouncemntsCardsOnAdmin)

})

function alterLastClickedElement(element){
    if(element.tagName == 'LI'){
        liSelected[previousClickLI-1].classList.remove('active')
        previousClickLI = Number(element.innerText)
        liSelected[previousClickLI-1].classList.add('active')
    }
}

function buildAnnouncemntsCardsOnAdmin(dataReceived,columns){
    let{announcements,total,limit} = dataReceived
    buildAll(announcements,total,limit,columns);
}


function getDataFromServer(pathURL,dataToSend,callback){

    let fetchConfig = {
        method:'POST',
        body:JSON.stringify(dataToSend),
        headers:{
            'Content-Type':'application/json'
        }
    }

    fetch(window.location.href+pathURL,fetchConfig)
    .then(response => response.json())
    .then(data => {

        callback(data,3)

    })

}

function formatCategory(category){
    return category.toLowerCase().replace(/\s/g,'')
}

function formatPrice(price){
    const formatter = new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL' 
      });
      
    const formatted = formatter.format(price);
      
    return formatted;
}

function buildAll(announcements,total,limit,columns){
    let row;

    listAnnouncements.innerHTML = ''
    listIndexPages.innerHTML=''

    for(let i = 0,round = Math.ceil((announcements.length)/columns); i < round ;i++){

        row = document.createElement('div')
        row.setAttribute('class','row my-4')

        for(let j = i*columns; j < (i+1)*columns; j++){   
            if(announcements[j] == undefined){
                break
            }

            row.innerHTML +=`
            <div class="col-md-${12/columns} col-sm-12">
                <div class="card">
                <a href="/announcements/detail/${announcements[j].id_anuncio}">
                <img src="/images/img/carlos-muza-hpjSkU2UYSU-unsplash.jpg" class="card-img-top" alt="...">
                </a>
                    ${announcements[j].prioridade ? `<span class="spotlight p-2">Destaque</span>` : ''}
                <span class="categorie tag-${formatCategory(announcements[j].categoria.nome)} p-2">${announcements[j].categoria.nome}</span>
                    <div class="card-body">
                    <div class="card-body-container">
                        <h5 class="card-title">${announcements[j].descricao}</h5>
                        <p class="card-text">${formatPrice(announcements[j].preco)}</p>
                    </div>

                    <div class='button-link'>
                        <div class='link-1'>    
                            <a href="/announcements/update/${announcements[j].id_anuncio}">Editar</a>
                        </div>
                        <div class='link-2'>    
                            <a href="/announcements/delete/${announcements[j].id_anuncio}" onclick="deleteAds(event)">Deletar</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            ` 
           
            listAnnouncements.appendChild(row);
        }
    }

    for(let v=1;v < Math.ceil(total/limit);v++){
        listIndexPages.innerHTML +=`
        <li class='page-item page-link'>${v}</li>
        ` 
    }

    liSelected = document.querySelectorAll('div#contain div.announcements-navigation ul li');
    liSelected[previousClickLI-1].classList.add('active');
}

async function deleteAds(e){
    e.preventDefault();

    let url = e.target

    let result = await fetch(`${url}`)

        result = await result.json();

        if(result.msg == 'success'){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Anúncio deletado com sucesso',
                showConfirmButton: false,
                timer: 3000
            })

         setTimeout(() => {
             window.location.reload()
         },3000)   

        }else if(result.msg == 'error'){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Que pena, não foi possível deletar o anúncio!',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
}









   


