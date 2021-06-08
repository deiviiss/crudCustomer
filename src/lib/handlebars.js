const helpers = {}

//cambia numero por moneda
helpers.formatterMoneda = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

//formato a customer (moneda fecha)
helpers.formatterCustomer = (customer) => {
  //valida si hay customer
  if (customer.length > 0) {
    //itera cutomers para accedes a propiedades
    for (let i = 0; i < customer.length; i++) {

      let montoPeso = (customer[i].monto)
      let fechaTramite = (customer[i].fecha_tramite)
      let fechaRetiro = (customer[i].fecha_ultimo_retiro)

      //numero a pesos
      customer[i].monto = helpers.formatterMoneda.format(montoPeso)

      //* condiciona las fechas
      //fecha trámite
      if (fechaTramite != null || fechaTramite != undefined) {
        customer[i].fecha_tramite = helpers.formatterFecha(fechaTramite)
      }
      else {
        customer[i].fecha_tramite = 'Sin asignar'
      }

      //fecha último retiro
      if (fechaRetiro != null || fechaRetiro != undefined) {
        customer[i].fecha_ultimo_retiro = helpers.formatterFecha(fechaRetiro)
      }
      else {
        customer[i].fecha_ultimo_retiro = 'Sin retiro'
      }

    }

    return customer
  }
}

//formato fecha (dd/mes/yy)
helpers.formatterFecha = (fecha) => {
  let month = new Array(); //Array que contiene los meses
  month[0] = "Enero";
  month[1] = "Febrero";
  month[2] = "Marzo";
  month[3] = "Abril";
  month[4] = "Mayo";
  month[5] = "Junio";
  month[6] = "Julio";
  month[7] = "Agosto";
  month[8] = "Septiembre";
  month[9] = "Octubre";
  month[10] = "Noviembre";
  month[11] = "Diciembre";

  fecha = fecha.getDate() + '/' + month[fecha.getMonth()] + '/' + fecha.getFullYear()

  return fecha
}

//coloca la fecha de trámite
helpers.fechaTramite = (fbaja) => {
  //la fecha
  var fbaja = new Date(fbaja);

  //dias a sumar
  var dias = 47

  //nueva fecha sumada
  fbaja.setDate(fbaja.getDate() + dias);
  //formato de salida para la fecha
  ftramite = fbaja.getFullYear() + '-' +
    (fbaja.getMonth() + 1) + '-' + fbaja.getDate();

  return ftramite
}

//Formato a altas (fecha)
helpers.formatterEditAlta = (customer) => {

  if (customer.length > 0) {
    //recorrer para acceder a propiedades
    for (let i = 0; i < customer.length; i++) {

      let fechaBaja = customer[i].fecha_baja
      let fechaTramite = customer[i].fecha_tramite
      let fechaRetiro = customer[i].fecha_ultimo_retiro

      //formato de fechas
      // fechaBaja = fechaBaja.toLocaleDateString('en-GB');
      // fechaBaja = fechaBaja.split("/").reverse().join("-")
      // customer[i].fecha_baja = fechaBaja

      // fechaTramite = fechaTramite.toLocaleDateString('en-GB');
      // fechaTramite = fechaTramite.split("/").reverse().join("-")
      // customer[i].fecha_tramite = fechaTramite

      //valida si hay fecha de retiro convierte a yy-mm-dd
      if (fechaRetiro != null) {
        fechaRetiro = fechaRetiro.toLocaleDateString('en-GB');
        fechaRetiro = fechaRetiro.split("/").reverse().join("-")
        customer[i].fecha_ultimo_retiro = fechaRetiro
      }
    }
  }

  return customer
};

//convierte número a mondeda
helpers.formatterPeso = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

// calcula cotización y da formato de moneda
helpers.calcularCosto = (cantidad, porcentaje) => {
  let cobro;
  let aseguramiento;
  let cobroCliente;
  let libreCliente;
  let porcentajeCobro = parseInt(porcentaje) / 100 //para correr dos lugares el punto decimal

  if (cantidad > 25001) {
    cobro = cantidad * porcentajeCobro
    aseguramiento = 2000
    cobroCliente = cobro + aseguramiento
    libreCliente = cantidad - cobroCliente
  }
  else if (cantidad > 15000) {
    cobro = cantidad * porcentajeCobro
    aseguramiento = 1700
    cobroCliente = cobro + aseguramiento
    libreCliente = cantidad - cobroCliente
  }
  else {
    cobro = cantidad * porcentajeCobro
    aseguramiento = 1300
    cobroCliente = cobro + aseguramiento
    libreCliente = cantidad - cobroCliente
  }

  //  formato moneda
  montoPesos = helpers.formatterPeso.format(cantidad)
  cobroPesos = helpers.formatterPeso.format(cobro)
  aseguramientoPesos = helpers.formatterPeso.format(aseguramiento)
  cobroClientePesos = helpers.formatterPeso.format(cobroCliente)
  libreClientePesos = helpers.formatterPeso.format(libreCliente)

  // objeto que recibe la vista result
  retiro = {
    montoPesos,
    cobroPesos,
    aseguramientoPesos,
    cobroClientePesos,
    libreClientePesos,
  }
  return (retiro)
}

module.exports = helpers;