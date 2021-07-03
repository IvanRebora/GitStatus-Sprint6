const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware'); 
const formValidations = require('../middlewares/validateRegisterMiddleware');
const profileValidations = require('../middlewares/validateProfileMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');





router.get('/login',guestMiddleware, controller.login);

router.post('/login', controller.loginProcess);



// Logout
router.get('/logout/', controller.logout);

router.get('/profle/:id', authMiddleware, controller.detail)
router.get('/register', guestMiddleware, controller.register)
router.post('/register/create',  uploadFile.single('fileavatar'), formValidations, controller.processRegister)
router.get('/profile/edit/:id', controller.edit)
router.put('/profile/edit/:id', authMiddleware, uploadFile.single('filavatar') ,profileValidations , controller.update)


module.exports = router;