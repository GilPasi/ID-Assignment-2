/*
Internet Development Assignment 3
Authors:
Yulia Moshan 319656510
Gil Pasi     206500936

Dependecies: nodemon,express,mongojs*/


//__________Setup______________
const express = require('express')
const cart = require('./cart.js')
const app = express()
const port = 8080

const mongo = require('mongojs')

const MONGO_USERNAME = 'Student'
const MONGO_PWD = 'Webdev2023Student'
const MONGO_DB = 'webdev2023'
const MONGO_CONN = "mongodb+srv://"+MONGO_USERNAME +":" +MONGO_PWD + "@cluster0.uqyflra.mongodb.net/"+MONGO_DB;
console.log(MONGO_CONN)
const db = mongo(MONGO_CONN);
const cartsCollection = db.carts_206500936;


//__________Middlewares___________

//Log all requests for debugging purposes
const log = (res,req,next)=>{
    console.log(`New request for: ${req}`)
    next();
}
app.use(log)
app.use(express.json())

//__________Routes______________

app.get('/test', (req, res) => {
    res.json({quantity:3})
    console.log("DONE")
})



app.get('/' , (req,res)=>{
    const userCart = cart.new()
    cartsCollection.save(userCart ,(err , doc)=>{
        if(err)
            res.send(userCart)
        else
            res.sendStatus(200)
    }
)})


app.use(express.static('frontend'))
app.listen(port ,()=>console.log("Server is listening on port " + port))