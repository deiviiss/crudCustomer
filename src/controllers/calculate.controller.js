const helpers = require('../lib/handlebars.js');

const controller = {}

controller.getCalculate = async (req, res) => {
  res.render('calculate/calcular.hbs')
}

controller.postCalculate = async (req, res) => {

  const cantidad = req.body.cantidad

  helpers.calcularCosto(cantidad)

  res.render('calculate/result.hbs', { retiro })
}



module.exports = controller;