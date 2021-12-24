//starting app

//dependends
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
// import bodyParser from 'body-parser';

const routerApi = require('./routes/index')

const { database } = require('./keys');

//handlebars if_equal
const isEqualHelperHandlerbar = function (a, b, opts) {
  if (a == b) {
    return opts.fn(this)
  } else {
    return opts.inverse(this)
  }
}

//inizializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));//indica directorio de las vistas

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars'),
  helpers: { if_equal: isEqualHelperHandlerbar } // usar funcion en vistas
}));
app.set('view engine', '.hbs');

//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));//acepta los datos que envia el formulario
app.use(express.json());
app.use(session({
  secret: 'basewendy',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.fail = req.flash('fail');
  app.locals.user = req.user;
  next();
});

// routes
routerApi(app)

//public
app.use(express.static(path.join(__dirname, 'public')));

//starting th server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
})
