const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// dotenv config
dotenv.config();
const port = process.env.PORT;

// MongoDb-Atlas(Database) configuration
const uri = process.env.DBURI;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connected to database!")
}).catch((err)=>{
    console.log(err);
})

// Express configuration
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
try {
    app.use(express.static(path.join(__dirname,'static')));
} catch (error) {console.log(error);}


// JWT Private Key
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

app.post('/login', async (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let token = jwt.sign({
        'firstName':"Abhisek",
        'lastName':'Upadhaya',
        'username':username
    }, jwtPrivateKey);

    res.send(JSON.stringify({'auth':true, 'token':token}));
});

// Running a Backend App
app.listen(port, ()=>{
    console.log(`Open in Browser : http://127.0.0.1:${port}`);
})