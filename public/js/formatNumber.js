let listFormat = document.querySelectorAll(".nformat");

for(let i = 0; i < listFormat.length; i++){
  listFormat[i].innerText = formatarPreco(listFormat[i].innerText)
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