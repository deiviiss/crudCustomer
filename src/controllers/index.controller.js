//objeto controller
const controller = {}

controller.index = (req, res) => {
  res.render('index.hbs')
};

module.exports = controller;