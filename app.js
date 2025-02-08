var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactoRouter = require('./routes/contacto');
var productosRouter = require('./routes/productos');
const bodyParser = require('body-parser');
const ContactosController = require('./controllers/contactosController');
const passport = require("passport");
const contactosRouter = require("./routes/contactos");
const authRouter = require("./routes/auth");

const session = require("express-session");
var app = express();


app.use(
  session({
    secret: process.env.SESSION_SECRET || "tu_clave_secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // No accesible por JavaScript
      sameSite: "strict", // Prevenir CSRF
      maxAge: 15 * 60 * 1000, // 15 minutos
    },
  })
);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use("/contactos", contactosRouter); // Ruta protegida de contactos
app.use("/auth", authRouter); // Autenticación
app.use("/", authRouter); // Esto asegura que las rutas definidas en auth.js estén accesibles desde el app



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacto', contactoRouter); 
app.use('/productos', productosRouter); 
// Ruta para mostrar el formulario de inicio de sesión
app.get("/login", (req, res) => {
  res.render("login"); // Asegúrate de que "login.ejs" exista en tu carpeta de vistas
});


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/subirDatos', (req, res) => ContactosController.add(req, res));


app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
