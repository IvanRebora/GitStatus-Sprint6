const express = require('express');
const app = express();
const path = require('path');
const cookies = require('cookie-parser');
const session = require('express-session');


const publicPath = path.resolve(__dirname, './public') ;
const puerto= process.env.PORT;


const userLoggedMiddleware = require ('./middlewares/userLoggedMiddleware');
const admLoggedMiddleware = require ('./middlewares/admLoggedMiddleware');

//Traemos la inforamción de las rutas
const homeRouter = require ('./routes/homeRouter');
const productRouter = require ('./routes/productRouter');
const userRouter = require ('./routes/userRouter');
const userApiRouter = require('./routes/api/userApiRouter')
const productApiRouter = require('./routes/api/productApiRouter')

//Para que llegue la información por body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

//Para usar métodos put y delete
const methodOverride = require ('method-override');
//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

//app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static('public'));

app.use(session({
	secret: "Secreto",
	resave: false,
	saveUninitialized: false,
}));

//Este middleware debe ir después de ssesion
app.use (userLoggedMiddleware);
app.use (admLoggedMiddleware);

app.use('/', homeRouter);

app.use('/', userRouter);

app.use('/products', productRouter);

app.use('/products', productRouter);

app.use('/api/users', userApiRouter);

app.use('/api/products', productApiRouter);

/*app.use((req, res, next) => {
	res.status(404).send('<h1>404: Not Found</h1>')
});*/
app.use((req, res, next) => {
    res.status(404).render('error404')
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto' + PORT)
}

);