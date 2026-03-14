const express = require('express')
const app = express();//it is an instance of express or all express data will be store in app and we do the work by using app
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // • bodyParser.json() automatically parses the JSON data from the request body and converts it into a JavaScript object, which is then stored in the req.body.

const Person = require('./models/Person');

app.get('/', function (req, res) {  // '/' is an address mean agar koi bi iss address pe jayega usko response mein Hello Welcome to SAM hotel milega.'/' it is the option in menue
  res.send('Welcome to SAM hotel')
})

// see in side the mongodb compass one hotel data base is their and inside that people is there and inside that the data will be there

// ItemMenu api

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


// Use the routers
app.use('/person',personRoutes)
app.use('/menu',menuItemRoutes)

app.listen(3000,()=>{
    console.log('listening on port 3000');
})
