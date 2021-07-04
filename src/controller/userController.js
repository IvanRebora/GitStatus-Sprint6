
const path = require('path');
const models = require('../database/models');
const { Op } = require("sequelize");
const moment = require('moment');
const {	validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const sequelize = models.sequelize;

// Funcionalidad userController
const userController = {
    
    // Registro (GET)
    register: (req, res) => {
        res.render('register');
    },



    processRegister: async (req, res) => {
        try{
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render('register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            // console.log(req.body.email);
            
            let userInDB = await models.User.findOne({where: {email: req.body.email}})
            // console.log(userInDB);
           
    
            if (userInDB) {
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
    
            let userToCreate = {
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address: req.body.address,
                avatar: req.body.avatar,
                email: req.body.email              

            }
            console.log(`USUARIO POR CREARSE: ${userToCreate}`);
    
            let userCreated = await models.User.create(userToCreate);
            console.log(`USUARIO CREADO ${userCreated}`)
    
            return res.redirect('/login');
        }
        catch(error){
            console.log(error);
        }
        
    },

    

    // Login (GET)    
    login: (req, res) => {
        res.render('login')
    },

    // Login (POST) - Session de usuario
    loginProcess: async (req, res) => {
        try{
          let userToLogin = await models.User.findOne({where: {email: req.body.email}})
        // console.log(userTologin);
        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.remember_user) {
                    res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
                }

                return res.redirect('/profile');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });  
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
        
        }
        catch(error){
            console.log(error);
        }

        
    },


    detail: (req, res) => {
        models.User
            .findByPk(req.params.id)
            .then(user => {
                res.render('profile.ejs', {user})
            })
    },

    edit: (req, res) => {
        Promise
        .all(User.findByPk(req.params.id))
        .then((user) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'profile'), {user})})
        .catch(error => res.send(error))
    },
    update: (req, res) => {
        models.User
            .update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address: req.body.address,
                avatar: req.body.avatar,
                email: req.body.email,
                password: req.body.password
                }, {
                where: {
                    id: req.params.id,
                }
            })
            .then(user => {
                return res.status(200).json({
                    data: user,
                    status: 200,
                    updated: 'Ok'
                })
            })
    },
    profile: (req, res) => {
        res.render('profile', {
            user: req.session.userLogged
        });

    },

    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = userController;