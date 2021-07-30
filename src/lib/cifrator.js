//cifra y compara password con bcryptjs

const bcryptjs = require('bcryptjs');

const cifrator = {}

//métodos del objeto

//encripta password
cifrator.encryptaPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);//crea cade salt
  const hashPassword = await bcryptjs.hash(password, salt);//cifra la contraseña

  return hashPassword;
};

//compara contraseña
cifrator.comparaPassword = async (password, savedPassword) => {
  try {
    return await bcryptjs.compare(password, savedPassword);
  } catch (error) {
    console.log(error);
  }
};

module.exports = cifrator;
