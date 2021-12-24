//objeto controller
const controller = {}

controller.home = (req, res) => {
  res.render('home.hbs')
};

module.exports = controller;