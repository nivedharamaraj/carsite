var express =require('express') ;
var db = require('../config/db');
const bcrypt = require("bcrypt");
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('register',{message:req.flash('message')});;
});
router.post('/',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password; 
    if(!username || !password){
        req.flash('message','Enter user and pasword');
                res.redirect('/register');
    }
    else{ 
        db.query('SELECT username from user WHERE username =? ',[username],async(error,result)=>{
            if(result[0]){
                req.flash('message','Enter user already registered');
                res.redirect('/register');
            }
            else{
                let hashedPassword = await bcrypt.hash(password, 8);
                console.log(hashedPassword);
                db.query('INSERT INTO user SET ?',{username :username,password :hashedPassword},(error,result)=>{
                     res.redirect('/login');
                })

            }
        })
    }
    
    });
module.exports=router