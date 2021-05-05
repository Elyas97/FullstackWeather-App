const express=require('express');
const app=express();
const authController=require('../controllers/auth');
const cors=require('cors');
const cookieParser=require('cookie-parser')
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config({path:'../.env'})
const mysql=require("mysql");
const { check, validationResult } = require('express-validator');
var fs = require("fs");
var util = require('util'); // for async calls


app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded())
app.get('/',function (req,res) {
    res.send("Hello express")
})
app.post('/register', [check('first_name').isLength({ min: 2 }).withMessage("vähintään 2 merkkiä!"),
    check('last_name').isLength({ min: 2 }).withMessage("vähintään 2 merkkiä!"),check("password").isLength({min:6})
    ,
    check('email').isEmail().withMessage('Syötä oikea sähköposti')] ,authController.register)
app.post('/login',[check('password').isLength({ min: 6 }).withMessage("vähintään 2 merkkiä!"),
    check('email').isEmail().withMessage('Syötä oikea sähköposti')],authController.login)
app.listen(3000,function () {
    console.log("Server is up on port 3000")
})
app.get('/user',authController.verifytoken,function (req,res) {
    jwt.verify(req.token,process.env.JWT_PASS,(err,data)=>{
        if (err){
            res.sendStatus(403)
        } else{

            res.json({
                message:"Access allowed",
                data
            })
        }
    })
})
app.post('/getCountries',authController.checkSQLData)
app.post('/NewCountry',authController.saveToDatabase)
app.post('/clearTable',authController.clearTable)