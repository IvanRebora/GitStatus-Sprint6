//let productos = require('../data/productsData');

const path = require('path');
const DB = require('../database/models');
const { Op } = require("sequelize");
const moment = require('moment');

//const jsonDB = require('../model/jsonDatabase');

//const productModel = jsonDB('products');

let productController = {

    list: (req, res) => {
        DB.Product
            .findAll()
            .then(products => {
                res.render('home.ejs', {products})
            })
    },
    cart: (req, res) => {
        res.render('cart');
    },

    


        add: (req, res) => {
            Promise
                .all(Product.findAll())
                .then((allProducts) => {
                    return res.render(path.resolve(__dirname, '..', 'views', 'createProduct'), {allProducts})
                })
                .catch(error => res.send(error))
        },
        create: (req, res) => {
            DB.Product
                .create({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    discount: req.body.discount,
                    image: req.body.image,
                    stock_min: req.body.stock_min,
                    stock_max: req.body.stock_max,
                    brands_id: req.body.brands_id,
                    categories_id: req.body.categories_id
                    })
                .then(product => {
                    return res.status(200).json({
                        data: product,
                        status: 200,
                        created: 'Ok'
                    })
                })
                .catch(error => res.send(error))
        },


    detail: (req, res) => {
        DB.Product
            .findByPk(req.params.id)
            .then(product => {
                res.render('productDesc.ejs', {product})
            })
    },
    
    edit: (req, res) => {
        Promise
        .all(Product.findByPk(req.params.id))
        .then((product) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'editProduct'), {product})})
        .catch(error => res.send(error))
    },


    update: (req, res) => {
        DB.Product
            .update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                    discount: req.body.discount,
                    image: req.body.image,
                    stock_min: req.body.stock_min,
                    stock_max: req.body.stock_max,
                    brands_id: req.body.brands_id,
                    categories_id: req.body.categories_id
                }, {
                where: {
                    id: req.params.id
                }
            })
            .then(product => {
                return res.status(200).json({
                    data: product,
                    status: 200,
                    updated: 'Ok'
                })
            })
            .catch(error => res.send(error))
    },
    

    delete: (req, res) => {
        DB.Product
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((response) => {
                return res.redirect('/')
            })
            .catch(error => res.send(error))
    },

    search: (req, res) => {
        DB.Product
            .findAll({
                where: {
                    name: { [Op.like] : '%' + req.query.keyword + '%' }
                }
            })
            .then(products => {
                if(products.length > 0) {
                    return res.status(200).json(products)
                }
                return res.status(200).json('El producto que busca no ha sido encontrado')
            })
    }



}

module.exports = productController;