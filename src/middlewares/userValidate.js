const path = require('path');
const {body} = require ('express-validator');
const {User} = require('../database/models');


const validations = [
    body('first_name').notEmpty().withMessage('Debe ingresar su nombre'),
    body('last_name').notEmpty().withMessage('Debe ingresar su apellido'),
    body('email').isEmail().withMessage('Debe ingresar un E-mail')
        .custom(async (value, {req}) =>{
            let existe = await User.findOne ({
                where: {
                    mail : req.body.mail
                }
            })
            if(existe){
                throw new Error ('Este email ya está registrado')
            } else{
                return true;
            }
            return true;
        }),
    body('password').isLength({min:7}).withMessage('Elegir una pasword de 7 caracteres mínimo'),
    body('avatar').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif'];
            if(file){
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                } else{
                    return true;
                }
            }
        return true;
    })
       
]
module.exports = validations;