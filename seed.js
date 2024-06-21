const mongoose = require('mongoose');
const Product = require('./models/product')



mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Mongo  Connection Open");
    })
    .catch(error => {
        console.log("Oh No Mongo connection error !!!");
        console.log(error);
    })
// const p = new Product({
//     name: 'Apple',
//     price: 130,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p);
//     }).catch(err => console.log(err))

const seedProducts = [{
    name: "Fairy Eggplant",
    price: 1.00,
    category: "vegetable"
}, {
    name: "Organic Goddess",
    price: 4.99,
    category: 'fruit'
}, {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "fruit"
}, {
    name: "Organic Celery",
    price: 1.50,
    category: "vegetable"
}, {
    name: "Choclate Whole Milk",
    price: 2.69,
    category: "dairy"
}];
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(error => console.log(error))