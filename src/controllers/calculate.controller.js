const helpers = require('../lib/handlebars.js');

const controller = {}

controller.getCalculate = async (req, res) => {
  res.render('calculate/calcular.hbs')
}

controller.postCalculate = async (req, res) => {

  const { cantidad, porcentaje } = req.body

  console.log(porcentaje);

  helpers.calcularCosto(cantidad, porcentaje)

  res.render('calculate/result.hbs', { retiro })
}



module.exports = controller;