

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL' 
});

const formatted = formatter.format(number);

console.log(formatted);