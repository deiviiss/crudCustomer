const { calcularCosto } = require('../lib/handlebars.js');

const controller = {}

//lista afores
controller.getAfores = async (req, res) => {

  res.render('recursos/afores.hbs')
}

//cotizar
controller.getCalculate = async (req, res) => {
  res.render('recursos/calcular.hbs')
}

controller.postCalculate = async (req, res) => {

  const { cantidad, porcentaje } = req.body

  calcularCosto(cantidad, porcentaje)

  res.render('recursos/result.hbs', { retiro })
}

module.exports = controller;