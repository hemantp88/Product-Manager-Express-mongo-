const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product')


const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Mongo  Connection Open");
    })
    .catch(error => {
        console.log("Oh No Mongo connection error !!!");
        console.log(error);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products })
})




app.listen(3000, () => {
    console.log("Lintening on port 3000 !")
})

