var express=require("express")
var bodyParser=require("body-parser")
//var mongoose=require("mongoose")
const database = require("./mongodb")
//const paymentdata = require("./mongodb")
const port = process.env.PORT || 8080

const app=express()

app.use(bodyParser.json())
app.use(express.static('DairyDelight'))
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get("/",(req,res) => {
    res.render('index.html')
})



app.post("/sign_up",async (req,res) => {
   

    var data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    
       
    await database.users.insertMany([data])
    return res.redirect('./index.html')
})

app.post('/login', async (req, res) => {

    try {
        const check = await database.users.findOne({ email:req.body.email })
        //console.log(req.body.password);
        if (check && check.password === req.body.password) {
            return res.redirect("./index.html");
        }

        else {
            return res.send('incorrcet password');
        }
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');   
    }
})

app.post('/payment',async (req, res) => {

    var data1={
        cardname:req.body.name,
        email:req.body.email,
        billingaddress:req.body.address,
        city:req.body.city,
        zipcodeno:req.body.zip,
        creditcardno:req.body.cardnumber,
        creditcardexp:req.body.expiry,
        cvv:req.body.cvv,
        billingzip:req.body.billingzip
    }

    await database.paymentdata.insertMany([data1])
    return res.redirect('index.html')
})


app.listen(port, () => {
    console.log('Listening on port 8080');
})