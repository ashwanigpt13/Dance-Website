const express = require("express");
const path = require("path");
const fs = require("fs");
const { Router } = require("express");
const { Server } = require("http");
const app= express();
const bodyParser = require("body-parser")

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/Contactdance');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const port = 80;

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

const Contact = mongoose.model('Contact', contactSchema);

//express
app.use('/static', express.static('static')) //serves static files
//app.use(express.urlencoded())

app.use(bodyParser.urlencoded({ extended: false }));
//pug
app.set('view engine', 'pug') //set template engine as pug
app.set('views', path.join
(__dirname, 'views')) // our pug end point.


//endpoints 
app.get('/', (req, res) => {
    
    const params = {  }
    res.status(200).render('index.pug', params)
})

app.get('/about', (req, res) => {
    
    const params = {  }
    res.status(200).render('about.pug', params) // this end point displays the about page
})

app.get('/courses', (req, res) => {
    
    const params = {  }
    res.status(200).render('courses.pug', params) // this end point displays the about page
})

app.get('/contact', (req, res) => {
    
    const params = {  }
    res.status(200).render('contact.pug', params) // this end point displays the contact page
})

app.post('/contact', (req, res) => {
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to databes")
    }).catch(()=>{
        res.status(400).send("Item not saved")
    });
    //res.status(200).render('contact.pug', params)
})

//LISTEN server
app.listen(port, () => {
    console.log(`app started on port ${port}`)
})