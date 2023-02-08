const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const cookieparser = require('cookie-parser')
const cors= require('cors')
const { config } = require('dotenv')

config({
    path:'./config/config.js'
})

const multer= require("multer");
const { AppConfig } = require('aws-sdk');


app.use(cookieparser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())
// app.use(cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Credentials', true); 
  
  next();
});


mongoose.connect("mongodb+srv://lonemohsin33:Diabetes7889%40@functionup.aq5cty2.mongodb.net/project3?retryWrites=true&w=majority", {
    useNewUrlParser: true 
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);
app.use("/*",function(req,res){

    res.status(400).send({status:false ,message:"Wrong path! "})
}
)





app.listen(process.env.PORT, function () {
    console.log('Express app running on port ' + (process.env.PORT ))
});
