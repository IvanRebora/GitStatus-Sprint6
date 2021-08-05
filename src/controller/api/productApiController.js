const path = require('path');
let db = require('../../database/models');
const sequelize = db.sequelize;

const imagesController = require('../imageController');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Product = db.Product;
const Category = db.Category;
const Image = db.Image;

//const { Product, Brand, Category, Color, Size, Visibility } = require('../../database/models');

const productApiController = {

    list: async (req, res) =>{
        if ( !req.query.query ) {
            try{ 
                let products = await Product.findAll({
                   /* attributes:[
                        'id', 'name', 'description', 'price', 'brand'
                    ],*/
                    include: [
                      "category", "images"
                    ]
                });
            /*    let categories = await Category.findAll({
                    include: [
                        'products'
                    ]
                });
          
                //Cuento los productos por categoría
            /*    let countByCategory = {
                    videojuegos: categories[0].products.length || 0,
                    cine: categories[1].products.length || 0,
                    comics: categories[2].products.length || 0
                }*/
                
                // API que reemplaza a la funcion normal
                let respuesta = {
                    meta: {
                        status : 200,
                        total: products.length,
                       // countByCategory: countByCategory,
                        url: 'api/products'
                    },
                    data: []
                    //data: products
                }
                products.forEach(product => {
                    respuesta.data.push({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        brand: product.brand,
                        price: product.price,
                       // category: product.category.name,
                        //images: product.images,
                        details: `/api/products/${product.id}`
                    })
                });
                res.json(respuesta);
            }
            catch (error) {res.status (500).json ({
                status:  500,
                message: error});
            }
       } /*else {
            pagination(req, res);
        }*/
    },

    detail: (req, res) =>{
        console.log('entre a Detail product')
        console.log('----------------------------')
        let productId = req.params.id;
        Product.findByPk(productId,
            {
                include : ['images','category' ]
            })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/products/:id'
                    },
                    data: {
                    id: product.id,
                   // category: product.category.name,
                    name: product.name,
                    description: product.description,
                    brand: product.brand,
                    price: product.price,
                    image: req.headers.host + '/images/' + product.images[0].name
                }
                }
                res.json(respuesta);
            })
            .catch(error => {
                res.json({
                    meta:{
                        status: 500,
                        message: error
                    }
                })})
    },
    count: async (req, res) =>{
        try{ 
            let products = await Product.findAll({
                include: [
                "category", "images"
                ]
            });
            
            const categoria = req.params.category;
            //return res.render('products/products', {products, categoria});
            
            // API que reemplaza a la funcion normal
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products/count'
                },
                data: products
            }
            res.json("El total de productos es: " + respuesta.meta.total);
        }
        catch (error) {res.status (500).json ({
            status:  500,
            message: error});
        }
    },
    latest: (req, res) =>{

        Product.findOne({ 
        order: [
            ['id', 'DESC']
        ],
        include: [
            "category", "images"
         ]
    })
    .then( product => JSON.parse(JSON.stringify(product)))
    .then( product => {
        let respuesta = {
            meta: {
                status: 200,
                url: 'api/products/latest'
            },
        data: {
        id: product.id,
        category: product.category.name,
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        image: req.headers.host + '/images/' + product.images[0].name
    }
}
res.json(respuesta);
    })
    
    .catch(error => {
        res.json({
            meta:{
                status: 500,
                message: error
            }
        })})

    
}
    


}

module.exports = productApiController;
