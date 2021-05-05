const { check, validationResult } = require('express-validator');
var util = require('util'); // for async calls
const jwt=require('jsonwebtoken');

const mysql=require("mysql");
const dotenv=require('dotenv').config({path:'../.env'})

var con=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user :process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
// node native promisify
const query = util.promisify(con.query).bind(con);

con.connect(function(err){
    if (err) throw err;
    console.log("connectted");
});
exports.register= (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("It works??")
        return res.status(400).json({ errors: errors.array() });
    }
    const name=req.body.first_name;
    const lastName=req.body.last_name;
    const email=req.body.email;
    const password=req.body.password;
    let sql='SELECT email FROM user WHERE email= ?';
    let isql='INSERT INTO user (first_name,last_name,email,password) VALUES(?,?,?,?)';

    (async () => { // IIFE (Immediately Invoked Function Expression)

        try {
             rows = await query(sql,[email]);
             if (rows.length>0 ){
               return res.send('Email taken');
             }else {
                insert= query(isql,[name,lastName,email,password])
               return  res.send('Success')
             }
        } catch (e) {
            console.log("Database error!"+ e);
        }

    })()

}
exports.login= (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email=req.body.email;
    const password=req.body.password
    let sql='SELECT * FROM user WHERE email= ? AND password=?';
    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            rows = await query(sql,[email,password]);
            if (rows.length>0 ){
                console.log(rows[0].email, rows.length)
                const id=rows[0].user_id;
                const user={
                    userId:rows[0].user_id,
                    name:rows[0].first_name,
                    last_name: rows[0].last_name,
                    email:rows[0].email
                }
                console.log(user)
                const token = await jwt.sign({user: user},process.env.JWT_PASS,{
                    expiresIn:process.env.JWT_DURATION
                })

            return res.send({message:'Success',token:token,user})


            }else {
                res.status(400).send({message:"Email or password is incorrect"})
            }

        }
        catch (e) {
            console.log("Database error!"+ e);
        }

    })()


}
exports.verifytoken=(req,res,next)=>{
    const bearerHeader=req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader!=='undefined'){
    const bearer=bearerHeader.split(' ');
    const beartoken=bearer[1]
    req.token=beartoken
    next();
    }else{
        console.log('didint work')
        res.sendStatus(404);
    }
}
exports.checkSQLData=(req,res,next)=>{
    console.log('got a request!!')
    let sql='SELECT country from countries WHERE users_id=?';
    const userID=req.body.user;
    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            rows = await query(sql,[userID]);
            if (rows.length>0 ){
               res.send(rows)
            }else {
                return  res.send('Empty')
            }
        }
        catch (e) {
            console.log("Database error!"+ e);
        }

    })()

}
exports.saveToDatabase=(req,res)=>{
    let sql='INSERT INTO countries (users_id,country)\n' +
        'VALUES (?,?);'
    const userID=req.body.user
    const country=req.body.country;
    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            rows = await query(sql,[userID,country]);
            return  res.send('Success')

        }
        catch (e) {
            console.log("Database error!"+ e);
        }

    })()
}
exports.clearTable=(req,res)=>{
    let sql='DELETE FROM countries WHERE users_id=?'
    const userID=req.body.user
    console.log(userID);
    (async () => { // IIFE (Immediately Invoked Function Expression)
        try {
            rows = await query(sql,[userID]);
            return  res.send('Success')

        }
        catch (e) {
            console.log("Database error!"+ e);
        }

    })()
}