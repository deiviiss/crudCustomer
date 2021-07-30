// define los métodos de autentificación con passport

const passport = require("passport")

const localStrategy = require('passport-local').Strategy;//tipo de autentificación local

const db = require('../database.js');
const cifrator = require('./cifrator.js');

//?=============== register usuer
passport.use(
  'local.register',
  new localStrategy(
    {//configuración de la autentificación
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true//para recibir datos adicionales en el registro de usuario
    },
    async (req, username, password, done) => {//define que hará después de autentificar con done

      let { nombre, apellido } = req.body

      let newUser = {
        username,
        password,
        fullname: nombre + ' ' + apellido
      };

      newUser.password = await cifrator.encryptaPassword(password);//encripta contraseña

      const sqlUser = 'SELECT * from users WHERE username = ?;'

      const resultUser = await db.query(sqlUser, username)

      if (resultUser.length > 0) {
        const userExist = resultUser[0]
        if (userExist.fullname === fullname) {
          done(null, false, req.flash('fail', 'Nombre de usuario ya existe'));
        }
        else if (userExist.username === username) {

          done(null, false, req.flash('fail', 'Usuario ya existe'));
        }

      }
      else {
        const sqlInsertUser = 'INSERT INTO users SET ?;'
        console.log(sqlInsertUser);
        const resultInsert = await db.query(sqlInsertUser, newUser);

        newUser.id = resultInsert.insertId;//id del objeto devuelto por MySQL
        req.flash('success', 'Bienvenido ' + newUser.username)
        return done(null, newUser);//almacena usuer en sesion
      }

    }
  )
);

//?=============== login user
passport.use(
  'local.login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true //para usar un campo extra
    },
    async (req, username, password, done) => {

      const sqlUser = 'SELECT * FROM users WHERE username = ?';

      const consulta = await db.query(sqlUser, [username]);

      if (consulta.length > 0) {
        const user = consulta[0];

        const validaPassword = await cifrator.comparaPassword(password, user.password);

        if (validaPassword) {
          done(null, user, req.flash('success',
            'Bienvenido ' + user.username));
        }
        else {
          done(null, false, req.flash('fail', 'Contraseña Incorrecta'));
        }
      }
      else {
        return done(null, false, req.flash('fail', 'Usuario no existe'));
      }
    }
  )
);

//serializa el user
passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});