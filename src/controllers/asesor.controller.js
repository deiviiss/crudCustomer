const helpers = require('../lib/handlebars')
const db = require('../database.js');

//objeto controller
const controller = {}

//*agrega asesor
//envia formulario add
controller.getAddAsesor = async (req, res) => {
  res.render('asesores/register-asesor.hbs')
}
//recibe el formulario add
controller.postAddAsesor = async (req, res) => {
  const { nombre, apellido } = req.body;
  const asesor = nombre + ' ' + apellido
  const fechaActual = new Date()

  const sqlValidarAsesor = "SELECT asesor FROM asesores WHERE asesor = ?;"

  validarAsesor = await db.query(sqlValidarAsesor, asesor)

  if (validarAsesor.length != 0) {

    req.flash('fail', 'Asesor ya existe')
    res.redirect('/register-asesor')
  }
  else {
    const newAsesor = {
      asesor,
      status: 'Activo',
      fecha_ingreso: fechaActual
    }

    const sqlInsert = 'INSERT INTO asesores SET ?';
    await db.query(sqlInsert, [newAsesor])

    req.flash('success', 'Asesor guardado')
    res.redirect('/')
  }
};

//*lista asesores
// lista de asesores
controller.getAsesores = async (req, res) => {
  const sqlAsesores = 'SELECT * FROM asesores;'

  asesores = await db.query(sqlAsesores);

  helpers.formatterAsesor(asesores)

  res.render('asesores/list-asesores.hbs', { asesores })
}
//cambia status asesor
controller.getStatusAsesor = async (req, res) => {
  const status = req.query.status
  const { id } = req.params

  const sqlUpdateStatusAsesor = 'UPDATE asesores set ? WHERE id_asesor = ?;'

  //objeto para actualizar
  const updateStatus = {
    status
  }

  await db.query(sqlUpdateStatusAsesor, [updateStatus, id])

  // req.flash('success', 'Asesor actualizado')
  res.redirect('/list-asesores')
}

//*edita asesor
//envia formulario
controller.getEditAsesor = async (req, res) => {
  const { id } = req.params;
  const sqlAsesor = 'SELECT * FROM asesores WHERE id_asesor = ?;'

  asesor = await db.query(sqlAsesor, id)

  res.render('asesores/edit-asesor.hbs', { asesor: asesor[0] })
};
//recibe formulario
controller.postEditAsesor = async (req, res) => {
  const asesor = req.body.asesor;
  const { id } = req.params;

  const sqlUpdateAsesor = 'UPDATE asesores SET ? WHERE id_asesor = ?'

  const updateAsesor = {
    asesor
  }

  await db.query(sqlUpdateAsesor, [updateAsesor, id])

  req.flash('success', 'Asesor Actualizado')
  res.redirect('/list-asesores')
}

module.exports = controller;