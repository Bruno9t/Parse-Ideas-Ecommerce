require('dotenv').config()

module.exports = {

    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:process.env.DB_DIALECT,
    database:process.env.DB_DATABASE,
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    define:{
      timestamps:true,
      underscored:true,
    }
  }

