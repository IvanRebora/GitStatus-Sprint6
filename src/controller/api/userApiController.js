const path = require('path');
let db = require('../../database/models');
const sequelize = db.sequelize;

//Aqui tienen otra forma de llamar a cada uno de los modelos
const User = db.User;


//const { User, Address } = require('../database/models');

const userApiController = {

    list: (req, res) => {
        User.findAll({ attributes:['id', 'first_name', 'last_name','email']})
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                },
               // data: users
               data: []
            }
            users.forEach(user => {
                respuesta.data.push({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    detail: `/api/users/${user.id}`
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
    },
    detail: (req, res) =>{
        console.log('entre a la api de detalle de usuario')
        console.log('----------------------------')
        let userId = req.params.id;
        User.findByPk(userId, 
            {
            //     include : ['rol']
            attributes:['first_name', 'last_name', 'email', 'avatar']
            })
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: '/api/users/:id'
                    },
                    data: {
                        userId : user.id,
                        first_name : user.first_name,
                        last_name : user.last_name,
                        email : user.email,
                        avatar : req.headers.host + '/avatars/' + user.avatar
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
        User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users/count'
                },
                data: {users}
            }
         res.json("El total de usuarios es " + respuesta.meta.total );
        })
        .catch((error) => {
            res.json({
                meta:{
                    status: 500,
                    message: error
                }
            })

        });
    }
}

module.exports = userApiController;