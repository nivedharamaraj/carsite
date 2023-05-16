var express =require('express') ;
var db = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var router = express.Router();

router.get('/',(req,res)=>{
        res.render('login',{message:req.flash('message')});
    });
router.post('/', async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    // db.query('SELECT * FROM user WHERE username = ?',[username], async function (error, results, fields) {
    //     if (error) {
    //       res.send({
    //         "code":400,
    //         "failed":"error ocurred"
    //       })
    //     }else{
    //       if(results.length >0){
    //         const comparision = await bcrypt.compare(password, results[0].password)
    //         if(comparision){
    //             res.send({
    //               "code":200,
    //               "success":"login sucessfull"
    //             })
    //         }
    //         else{
    //           res.send({
    //                "code":204,
    //                "success":"Email and password does not match"
    //           })
    //         }
    //       }
    //       else{
    //         res.send({
    //           "code":206,
    //           "success":"Email does not exits"
    //             });
    //       }
    //     }
    //     });
db.query('SELECT * FROM user WHERE username = ?', [username],async (error, results) => {
   
    console.log("username",results);
    
    if(results.length >0){
        const hasPassword = results[0].password
        console.log("hashedPassword",hasPassword);
        console.log("pass",password);
        const comparision = await bcrypt.compare(req.body.password,results[0].password)
        console.log("comparision",comparision);
        if(!comparision){
          res.send({
            "code":204,
            "success":"username and password does not match"
          })
        }
        else{
          res.redirect("/");
          
        }
         
        // if(results.length >0){
        //     const id = results[0].id;
        //     console.log("id",id);
        //     const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        //       expiresIn: process.env.JWT_EXPIRES_IN,
        //     });
        //     console.log("The Token is " + token);
        //     const cookieOptions = {
        //       expires: new Date(
        //         Date.now() +
        //           process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        //       ),
        //       httpOnly: true,
        //     };
        //     res.cookie("nivs", token, cookieOptions);
        //     res.status(200).redirect("/");
          }else{
            req.flash('message','Enter username and password');
            res.redirect('/login');
      }
    
  });

});

module.exports = router;
