const { Router } = require('express')

const homeRouter = require('./home.router')
const recursoRouter = require('./recurso.router.js')
const authenticRouter = require('./authentic.router')
const customerRouter = require('./customer.router')
const asesorRouter = require('./asesor.router')

function routerApi(app) {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/home', homeRouter);
  router.use('/recurso', recursoRouter);
  router.use('/authentic', authenticRouter);
  router.use('/asesor', asesorRouter);
  router.use('/customer', customerRouter);
}

module.exports = routerApi