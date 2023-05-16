
var mysql = require('mysql');

    const db =mysql.createConnection({
        host: 'localhost',
        user:'root',
        password:'',
        database: 'carsite'
        });
        
        db.connect((err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("connected successfully");
            }
        });
        module.exports = db;