require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http');
const cors=require("cors");
const path = require('path');
const {routers} = require('./src/routers')

const db_uri = process.env.BD_PORT;
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 5000;

mongoose.connect(db_uri)
.then(()=> console.log("Connected to the database!"))
.catch((err) => console.log(err));

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Название роута сотовляется из названия файла + роут
//Пример:
//http:/localhost:PORT/назвение_route/запрос    
routers.forEach(item => {
  app.use(`/${item}`, require(`./src/routers/${item}`));
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
