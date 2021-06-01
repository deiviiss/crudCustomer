let formulario = document.formulario_cliente;
let elementos = formulario.elements;

let sdescontadas = document.getElementById("sdescontadas");
let fretiro = document.getElementById("fretiro");
let curp = document.getElementById("curp");
let nss = document.getElementById("nss");
let afore = document.getElementById("afore");
let asesor = document.getElementById("asesor");

let validarInputs = function () {

  //valida curp
  if (curp.value.length != 18) {
    console.log('Curp incorrecta');
    curp.className = curp.className + ' is-invalid';
    return false;
  }
  else {
    curp.className = curp.classList.remove('is-invalid');
    curp.className = curp.className + ' form-control';
  }

  //valida nss
  if (nss.value.length != 11) {
    console.log('NSS incorrecto');
    nss.className = nss.className + ' is-invalid';
    return false;
  }
  else {
    nss.className = nss.classList.remove('is-invalid');
    nss.className = nss.className + ' form-control';
  }

  //valida si hay semanas descontadas
  if (sdescontadas.value != 0) {
    if (fretiro.value == "") {
      console.log('Cliente con semanas descontadas');
      fretiro.className = fretiro.className + ' is-invalid';
      return false;
    }
    else {
      fretiro.className = fretiro.classList.remove('is-invalid');
      fretiro.className = fretiro.className + ' form-control';
    }
  }

  //valida afore
  if (afore.value === 'Afore') {
    console.log('falta afore');
    afore.className = afore.className + ' is-invalid';
    return false;
  }
  else {
    afore.className = afore.classList.remove('is-invalid');
    afore.className = afore.className + ' form-control';
  }

  //valida asesor
  if (asesor.value === 'Asesor') {
    console.log('falta asesor');
    asesor.className = asesor.className + ' is-invalid';
    return false;
  }
  else {
    asesor.className = asesor.classList.remove('is-invalid');
    asesor.className = asesor.className + ' form-control';
  }

  return true
}

let enviar = function (event) {
  if (!validarInputs()) {
    console.log('Falto validar los Input')
    event.preventDefault();
  }
  else {
    console.log('Envia los datos');
    // event.preventDefault();
  }
}

formulario - addEventListener('submit', enviar)