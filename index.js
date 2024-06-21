const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product')


const mongoose = require('mongoose');
const { request } = require('http');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Mongo  Connection Open");
    })
    .catch(error => {
        console.log("Oh No Mongo connection error !!!");
        console.log(error);
    })

app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
})
app.post('/products', async (req, res) => {
    // console.log(req.body)
    const newProduct = new Product(req.body);
    await newProduct.save();
    // console.log(newProduct);
    // res.send('making your product')
    res.redirect(`  /products/${newProduct._id}`);

})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    console.log(foundProduct);
    // res.send("details.page!")
    res.render('products/show', { foundProduct })
})



app.listen(3000, () => {
    console.log("Lintening on port 3000 !")
})

