/*
Internet Development Assignment 3
Authors:
Yulia Moshan 319656510
Gil Pasi     206500936

Dependecies: nodemon,express,mongojs,cors,body-parser*/


//__________Setup______________
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
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

app.use(cors({
    origin:'*',
    allowedHeaders:'Origin, X-Requested-With, Content-Type, Accept'
}))
//Log all requests for debugging purposes
const log = (res,req,next)=>{
    console.log(`New request for: ${req}`)
    next();
}
app.use(log)
app.use(express.json())

//__________Routes______________

app.get('/test', (req, res) => {
    const crt = cart.new()
    cart.add(crt , "lovePotion" , 1)
    cart.recalc(crt)
    return res.json(crt)
})



app.get('/products' , (req,res)=>{
    cartsCollection.findOne({},(err , doc)=>{
        if(err)
            res.json(err)
        else
            res.json(doc)
    })

})

app.post('/products' ,(req , res)=>{ 
    const {body} = res
    console.log(body.product_id)   
    return res.json()
      

    // cartsCollection.findOne({} , (err,doc)=>{
    //     if(err)
    //         res.json(err)
    //     else{
    //             cart.add(doc , "lovePotion" , 1 )
    //         cart.recalc(doc)
    //         cartsCollection.save(doc , ()=>{res.json(doc)})
    //     }
    // })
})


app.use(express.static('frontend'))
app.listen(port ,()=>console.log("Server is listening on port " + port))