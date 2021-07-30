//depends
const passport = require('passport');
const cifrator = require('../lib/cifrator.js')
const db = require('../database.js');

//objeto controller
const controller = {};

//funciones-métodos del objeto

//?=============== restaurar contraseña
//envía formulario restaurar
controller.getRestorePassword = async (req, res) => {
  res.render('authentic/restore-password.hbs')
};

//recibe el formulario restaurar
controller.postRestorePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const updatePassword = {
    password
  };

  updatePassword.password = await cifrator.encryptaPassword(password);

  const sqlUpdatePassword = 'UPDATE users SET ? WHERE id = ?;';

  await db.query(sqlUpdatePassword, [updatePassword, id]);

  req.flash('success', 'Contraseña actualizada');
  res.redirect('/dashboard');
};

//?=============== registro usuario
//envia formulario registro
controller.getRegister = (req, res) => {
  res.render('./authentic/register-user.hbs')
}
//recibe formulario
controller.postRegister = passport.authenticate('local.register', {
  successRedirect: '/dashboard',
  failureRedirect: '/register-user',
  failureFlash: true
});

//?=============== lista usuarios
//envia
controller.getUsers = async (req, res) => {
  const sqlUsers = 'SELECT id, fullname, username FROM users ORDER BY fullname;'

  users = await db.query(sqlUsers)

  res.render('authentic/list-users.hbs', { users })
}

//?=============== editar usuario
//envia formulario
controller.getEditUser = async (req, res) => {
  const { id } = req.params;
  const sqlEditUser = 'SELECT id, fullname, username FROM users WHERE id = ?;'

  user = await db.query(sqlEditUser, id)

  res.render('authentic/edit-user.hbs', { user: user[0] })
}
//recibe formulario
controller.postEditUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, username } = req.body;
  const sqlUpdateUser = 'UPDATE users SET ? WHERE id = ?'

  const updateUser = {
    fullname,
    username
  }

  await db.query(sqlUpdateUser, [updateUser, id])

  req.flash('success', 'Usuario actualizado')
  res.redirect('/list-users')
}

//?=============== login usuario
//envia formulario
controller.getLogin = (req, res) => {
  res.render('authentic/login.hbs')
}
//recibe formulario
controller.postLogin = (req, res, next) => {
  passport.authenticate('local.login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

//?=============== logout usuario
//cierra sesión
controller.logout = (req, res) => {
  req.logOut();
  res.redirect('/login');
}

//?=============== dashboard
//envia dashboard
controller.dashboard = async (req, res) => {

  const sqlStatus = 'SELECT s.status, COUNT(s.status) AS total FROM clientes AS c JOIN status AS s ON c.id_status = s.id_status GROUP BY s.status ORDER BY s.status;';
  const sqlTotalClientes = 'SELECT cliente FROM clientes;'

  //status
  const customer = await db.query(sqlStatus);
  //total clientes
  let totalClientes = await db.query(sqlTotalClientes);
  totalClientes = totalClientes.length;

  res.render('dashboard', { customer, totalClientes })
}

module.exports = controller;