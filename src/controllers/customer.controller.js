const helpers = require('../lib/handlebars')
const db = require('../database.js');

//objeto controller
const controller = {}

//*agrega clientes
//envia formulario add
controller.getAdd = async (req, res) => {

  //asesores
  const sqlAsesor = 'SELECT asesor FROM asesores WHERE status = "Activo" ORDER BY asesor';
  const asesores = await db.query(sqlAsesor)

  //afores
  const sqlAfore = 'SELECT * FROM afores ORDER BY afore';
  const afores = await db.query(sqlAfore)

  res.render('customer/add-customer.hbs', { asesores, afores })
}
//recibe el formulario add
controller.postAdd = async (req, res) => {
  let { cliente, curp, nss, scotizadas, sdescontadas, fretiro, telefono, direccion, afore, monto, asesor } = req.body;

  //? Get valores de tablas (asesores, afores, zonas)
  //asesor
  const sqlAsesor = "SELECT asesor, id_asesor FROM asesores WHERE asesor = ?;"
  const rowAsesor = await db.query(sqlAsesor, asesor)
  const id_asesor = rowAsesor[0].id_asesor
  //afore
  const sqlAfore = "SELECT afore, id_afore FROM afores WHERE afore = ?;"
  const rowAfore = await db.query(sqlAfore, afore)
  const id_afore = rowAfore[0].id_afore

  //valida semanas cotizadas
  if (sdescontadas == 0) {
    fretiro = null
  }

  const newCustomer = {
    cliente,
    curp,
    nss,
    semanas_cotizadas: scotizadas,
    semanas_descontadas: sdescontadas,
    fecha_ultimo_retiro: fretiro,
    telefono,
    direccion,
    id_afore,
    monto,
    sueldo: monto / 30,
    id_asesor,
    id_status: 1
  }

  const sqlInsert = 'INSERT INTO clientes SET ?';
  await db.query(sqlInsert, [newCustomer])

  req.flash('success', 'Cliente guardado')
  res.redirect('/customer/add-customer')
}

//*edita cliente
//envia formulario edit
controller.getEdit = async (req, res) => {
  const { id } = req.params

  const sqlCustomer = 'SELECT c.id, c.cliente, c.curp, c.nss, c.semanas_cotizadas, c.semanas_descontadas, c.fecha_baja, c.fecha_ultimo_retiro, c.fecha_tramite, c.telefono, c.direccion, af.afore, c.monto, a.asesor, s.status, c.observaciones FROM asesores AS a JOIN clientes AS c ON a.id_asesor = c.id_asesor JOIN afores AS af ON af.id_afore = c.id_afore JOIN status AS s ON c.id_status = s.id_status WHERE c.id = ?;'

  //asesores
  const sqlAsesor = 'SELECT asesor FROM asesores WHERE status = "Activo" ORDER BY asesor;';
  const asesores = await db.query(sqlAsesor)

  //afores
  const sqlAfore = 'SELECT * FROM afores ORDER BY afore;';
  const afores = await db.query(sqlAfore)

  //status
  const sqlStatus = 'SELECT * FROM status ORDER BY status;';
  const status = await db.query(sqlStatus);

  const customer = await db.query(sqlCustomer, id)

  //formato a customer (fecha)
  helpers.formatterEditAlta(customer)

  res.render('customer/edit-customer.hbs', { customer: customer[0], asesores, afores, status })
}
//recibe el formulario edit
controller.postEdit = async (req, res) => {
  const { id } = req.params
  let { cliente, curp, nss, scotizadas, sdescontadas, fretiro, afore, monto, ftramite, asesor, telefono, direccion, observaciones, status } = req.body;

  //? Get valores de tablas (asesores, afores, zonas, status)
  //asesor
  const sqlAsesor = "SELECT asesor, id_asesor FROM asesores WHERE asesor = ?;"
  const rowAsesor = await db.query(sqlAsesor, asesor)
  const id_asesor = rowAsesor[0].id_asesor

  //afore
  const sqlAfore = "SELECT afore, id_afore FROM afores WHERE afore = ?;"
  const rowAfore = await db.query(sqlAfore, afore)
  const id_afore = rowAfore[0].id_afore

  //status
  if (status === undefined) {
    status = 'Sin fecha'
  }

  const sqlStatus = 'SELECT id_status FROM status WHERE status = ?;';
  const rowStatus = await db.query(sqlStatus, status);
  const id_status = rowStatus[0].id_status

  if (sdescontadas == 0) {
    fretiro = null
  }
  else if (status === 'Sin fecha') {
    ftramite = null
  }

  const updateCustomer = {
    cliente,
    curp,
    nss,
    semanas_cotizadas: scotizadas,
    semanas_descontadas: sdescontadas,
    fecha_ultimo_retiro: fretiro,
    fecha_tramite: ftramite,
    telefono,
    direccion,
    id_afore: id_afore,
    monto,
    sueldo: monto / 30,
    id_asesor: id_asesor,
    id_status: id_status,
    observaciones
  }

  const sqlUpdate = 'UPDATE clientes SET ? WHERE id =?';

  await db.query(sqlUpdate, [updateCustomer, id])

  req.flash('success', 'Cliente actualizado')
  res.redirect('/dashboard')
}

//*busca cliente
controller.postBusqueda = async (req, res) => {
  const { busqueda } = req.body;

  if (busqueda != '') {
    const sqlBuscar = 'SELECT c.id, c.cliente, c.curp, c.nss, c.semanas_cotizadas, c.semanas_descontadas, c.fecha_baja, c.fecha_ultimo_retiro, c.fecha_tramite, c.telefono, c.direccion, af.afore, c.monto, a.asesor, s.status FROM asesores AS a JOIN clientes AS c ON a.id_asesor = c.id_asesor JOIN afores AS af ON af.id_afore = c.id_afore JOIN status AS s ON c.id_status = s.id_status WHERE c.cliente LIKE "%' + [busqueda] + '%";'

    customer = await db.query(sqlBuscar)

    helpers.formatterCustomer(customer)

    res.render('customer/list-customer.hbs', { customer })
  }
  else {
    req.flash('fail', 'Escribe el nombre de un cliente')
    res.redirect('/dashboard')
  }
};

//*asigna fecha
//envia formulario fecha trámite
controller.getTramite = async (req, res) => {
  const { id } = req.params

  const sqlCustomer = 'SELECT id, cliente FROM clientes WHERE id = ?;'

  const customer = await db.query(sqlCustomer, id)

  res.render('customer/baja-customer.hbs', { customer: customer[0] })
}
//recibe formulario fecha trámite
controller.postTramite = async (req, res) => {
  const { id } = req.params
  let { fbaja } = req.body;

  //status
  const sqlStatus = 'SELECT id_status FROM status WHERE status = "Pendiente";';
  const status = await db.query(sqlStatus);

  fecha_tramite = helpers.fechaTramite(fbaja)

  const updateCustomer = {
    fecha_baja: fbaja,
    fecha_tramite,
    id_status: status[0].id_status
  }

  const sqlUpdate = 'UPDATE clientes SET ? WHERE id = ?;'

  await db.query(sqlUpdate, [updateCustomer, id])

  req.flash('success', 'Fecha asignada')
  res.redirect('/dashboard')
}

//*lista todos los clientes
//envia lista de todos los clientes
controller.getList = async (req, res) => {

  const sqlCustomer = 'SELECT c.id, c.cliente, c.curp, c.nss, c.semanas_cotizadas, c.semanas_descontadas, c.fecha_baja, c.fecha_ultimo_retiro, c.fecha_tramite, c.telefono, c.direccion, af.afore, c.monto, a.asesor, s.status FROM asesores AS a JOIN clientes AS c ON a.id_asesor = c.id_asesor JOIN afores AS af ON af.id_afore = c.id_afore JOIN status AS s ON c.id_status = s.id_status;'

  const customer = await db.query(sqlCustomer)

  helpers.formatterCustomer(customer)

  res.render('customer/list-customer.hbs', { customer })
}

//*lista clientes por status
//envia lista del clientes por status
controller.getstatus = async (req, res) => {
  const { status } = req.params;

  const sqlPendientes = 'SELECT c.id, c.cliente, c.curp, c.nss, c.semanas_cotizadas, c.semanas_descontadas, c.fecha_baja, c.fecha_ultimo_retiro, c.fecha_tramite, c.telefono, c.direccion, af.afore, c.monto, a.asesor, c.observaciones, s.status FROM asesores AS a JOIN clientes AS c ON a.id_asesor = c.id_asesor JOIN afores AS af ON af.id_afore = c.id_afore JOIN status AS s ON c.id_status = s.id_status WHERE s.status = ? ORDER BY c.fecha_tramite';

  const customer = await db.query(sqlPendientes, status)

  helpers.formatterCustomer(customer)

  res.render('customer/list-customer.hbs', { customer, status })
}

module.exports = controller;