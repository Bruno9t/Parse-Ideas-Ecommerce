let count = 0
let button = document.getElementById('view-more')
let container = document.querySelector('section#recentAnnouncements div.container')


window.addEventListener('load',verMais)
button.addEventListener('click',verMais)

function verMais(){
    count++

    enviarDados('/recents',{
        count,
    },modelarDados)
}

function modelarDados(dados,columns){
    let row;
    let {anuncios,total,limit} = dados
    let finish = Math.ceil(total/limit)

    if(count == finish){
         button.remove()
    }

    for(let i = 0,round = Math.ceil((anuncios.length)/columns); i < round ;i++){

        row = document.createElement('div')
        row.setAttribute('class','row my-4')

        for(let j = i*columns; j < (i+1)*columns; j++){   
            if(anuncios[j] == undefined){
                break
            }    

            row.innerHTML+=`
            <div class="col-md-${12/columns} col-sm-12">
                <div class="card">
                    <img src="/images/img/carlos-muza-hpjSkU2UYSU-unsplash.jpg" class="card-img-top" alt="...">
                    ${anuncios[j].prioridade ? `<span class="spotlight p-2">Destaque</span>` : ''}
                <span class="categorie tag-${formatarCategoria(anuncios[j].categoria.nome)} p-2">${anuncios[j].categoria.nome}</span>
                    <div class="card-body">
                        <h5 class="card-title">${anuncios[j].descricao}</h5>
                        <p class="card-text">${formatarPreco(anuncios[j].preco)}</p>
                        <a href="#" class="btn btn-primary">+ Detalhes</a>
                    </div>
                </div>
            </div>
            ` 
            container.appendChild(row)

        }
    }
}


function enviarDados(pathURL,data,modelarDados){
    fetch(window.location.origin+pathURL,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-type':'application/json'
        }
    }).then(response=>{
        return response.json()
    }).then(dados=>{

        modelarDados(dados,3)

    })
}


//formatar dados

function formatarCategoria(category){
    return category.toLowerCase().replace(/\s/g,'')
}

function formatarPreco(price){
    const formatter = new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL' 
      });
      
    const formatted = formatter.format(price);
      
    return formatted;
}