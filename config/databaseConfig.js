// Aqui, coloque as informações para conexão com seu banco de dados.
// Ao colocar seus dados, renomei esse arquivo para database.js.

module.exports = {

  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  dialect:process.env.DB_DIALECT,
  database:process.env.DB_DATABASE,
  username:process.env.DB_USER,
  password:process.env.DB_PASS,
  
}