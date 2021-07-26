const path = require('path');
const {body} = require ('express-validator');
const {User} = require('../database/models');

const validations = [
body('email').isEmail().withMessage('Debe ingresar un E-mail')
.custom(async (value, {req}) =>{
    let existe = await User.findOne ({
        where: {
            email : req.body.email
        }
    })

}),
body('password').isLength({min:8}).withMessage('Elegir una pasword de 8 caracteres mínimo')
]
module.exports = validations;