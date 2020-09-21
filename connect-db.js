const mysql = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'name_db'
});
 
connection.connect((err) => {

    if (err) {

      console.error('error connecting: ' + err.stack)
      
      return
    }
})

module.exports = connection
