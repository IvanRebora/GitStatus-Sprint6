/*const { response } = require('express');
const db = require('../../database/models');
const sequelize = db.sequelize;
const path = require('path');

const Products = db.Product;
const Categories = db.Category;

let categoryApiController = {
    list: async (req, res) => {
        try {
            // Busco todos las categorias en db
            let categories = await Categories.findAll();

            // Cuento la cantidad de categorias en db
            let countCategories = await Categories.count();

            // Cuento cantidad de productos en escalada
            let videojuegos = await Products.count({
                where: {
                    category_id: 1
                }
            })
            // Cuento cantidad de productos en camperas
            let cine = await Products.count({
                where: {
                    category_id: 2
                }
            })
            // Cuento cantidad de productos en calzado
            let comics = await Products.count({
                where: {
                    category_id: 3
                }
            })


            // Armo array con los valores de cantidad de producto de cada categoria
            let categoriesArray = [videojuegos, cine, comics]

            // Itero en array categorias insertandole la propiedad count
            let categoriesWithCount = () =>{
                for (let i = 0; i < categoriesArray.length; i++) {
                    categories[i].dataValues.count = categoriesArray[i];
                }
            }
            // Llamo a la funcion categoriesWithCount
            categoriesWithCount();

            // Armo respuesta en formato JSON
            let respuesta = {
                meta: {
                    status : 200,
                    count: categories.length,
                    categoriesCount : countCategories,
                    url: 'api/categories'
                },
                data: {
                    categories
                }
            }

            res.json(respuesta);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}

module.exports = categoryApiController;*/

const path = require('path');
let db = require('../../database/models');
const sequelize = db.sequelize;


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Category = db.Category;


//const { Category } = require('../database/models');

const categoryApiController = {

    list: (req, res) => {
        Category.findAll({ attributes:['id', 'name']})
        .then(categories => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: categories.length,
                    url: 'api/categories'
                },
               // data: categories
               data: []
            }
            categories.forEach(category => {
                respuesta.data.push({
                    id: category.id,
                    name: category.name,
                })
            });
            return res.json(respuesta);
        })
        .catch(error => {
            res.json({
                meta:{
                    status: 500,
                    message: error
                }
            })})
    ;
    },
    detail: (req, res) =>{
        console.log('entre a la api de detalle de categorias')
        console.log('----------------------------')
        let categoryId = req.params.id;
        Category.findByPk(categoryId, 
            {
            attributes:['name']
            })
            .then(category => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: category.length,
                        url: '/api/categories/:id'
                    },
                    data: {
                        categoryId : category.id,
                        name : category.name
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
    
    count: (req, res) =>{
        Category.findAll()
        .then(categories => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: categories.length,
                    url: 'api/categories/count'
                },
                data: {categories}
            }
         res.json("El total de categorias es " + respuesta.meta.total );
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

module.exports = categoryApiController;