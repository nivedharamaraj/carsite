var express =require('express') ;
//var db = require('../config/db');
var router = express.Router();
router.get('/',(req,res)=>{
    res.render('home');
});
router.get('/',(req,res)=>{


    res.render('carlist');
});

module.exports = router;