let listAnnouncements = document.querySelector('div#contain div.announcements')
let listIndexPages = document.querySelector('div#contain div.announcements-navigation ul')
let liSelected = document.querySelectorAll('div#contain div.announcements-navigation ul li')
let previousClickLI = 1;



window.addEventListener('load',function(e){
    liSelected[previousClickLI-1].style.backgroundColor = 'blue'

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
        liSelected[previousClickLI-1].style.backgroundColor='white'
        previousClickLI = Number(element.innerText)
        liSelected[previousClickLI-1].style.backgroundColor = 'blue'
    }
}

function buildAnnouncemntsCardsOnAdmin(dataReceived,columns){
    let row;
    let{announcements} = dataReceived

    listAnnouncements.innerHTML = ''

    for(let i = 0,round = Math.ceil((announcements.length)/columns); i < round ;i++){

        row = document.createElement('div')
        row.setAttribute('class','row my-4')

        for(let j = i*columns; j < (i+1)*columns; j++){   
            if(announcements[j] == undefined){
                break
            }    

            row.innerHTML =`
            <div class="col-md-${12/columns} col-sm-12">
                <div class="card">
                    <img src="/images/img/carlos-muza-hpjSkU2UYSU-unsplash.jpg" class="card-img-top" alt="...">
                    ${announcements[j].prioridade ? `<span class="spotlight p-2">Destaque</span>` : ''}
                <span class="categorie tag-${formatCategory(announcements[j].categoria.nome)} p-2">${announcements[j].categoria.nome}</span>
                    <div class="card-body">
                    <div class="card-body-container">
                        <h5 class="card-title">${announcements[j].descricao}</h5>
                        <p class="card-text">${formatPrice(announcements[j].preco)}</p>
                    </div>    
                        <a href="/announcements/detail/${announcements[j].id_anuncio}" class="btn btn-primary">+ Detalhes</a>
                    </div>
                </div>
            </div>
            ` 
            listAnnouncements.appendChild(row)

        }
    }

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