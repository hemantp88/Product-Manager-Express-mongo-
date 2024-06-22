const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product')
const methodOverride = require('method-override');


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
app.use(methodOverride('_method'));

const categories = ['vegetable', 'fruit', 'dairy', 'fungi'];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category: category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: "All" })
    }



})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})
app.post('/products', async (req, res) => {

    const newProduct = new Product(req.body);
    await newProduct.save();
    // console.log(newProduct);
    // res.send('making your product')
    res.redirect(`/products/${newProduct._id}`);

})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/show', { foundProduct })
})
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/edit', { foundProduct, categories })
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${foundProduct._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log("Lintening on port 3000 !")
})

