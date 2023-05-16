var express =require('express') ;
var db = require('../config/db');
const bcrypt = require("bcryptjs");
var router = express.Router();

router.get('/',(req,res)=>{
        res.render('login',{message:req.flash('message')});
    });
router.post('/',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
db.query('SELECT * FROM user WHERE username = ? and password=?', [username , password], async (error, results) => {
    console.log(results);
    if(results.length >0){
          res.redirect("/");
    
      }else{
            req.flash('message','Enter username and password');
            res.redirect('/login');
      }
    });

});

module.exports = router;