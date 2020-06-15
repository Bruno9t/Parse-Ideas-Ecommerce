let ul = document.querySelector('div#mainMenu ul')
let lastClicked = document.querySelectorAll('li.nav-item')
let imgHome = document.getElementById('image-home')

lastClicked[localStorage.getItem('lastClicked')].classList.add('active')

ul.addEventListener('click',function(e){
    localStorage.setItem('lastClicked',lastClicked[e.target.parentElement.id].id)
    alterActive(e.target)

})

console.log(localStorage.getItem('lastClicked'))


function alterActive(element){
    if(element.tagName == 'A'){   
        lastClicked[localStorage.getItem('lastClicked')].classList.remove('active')
        localStorage.setItem('lastClicked',element.parentElement.id || '0')
        lastClicked[localStorage.getItem('lastClicked')].classList.add('active')
    }
}