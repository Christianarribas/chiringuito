// ============================================================
// DATOS DE CONTACTO: es lo único que hay que cambiar.
// Ahora están VACÍOS a propósito (no son datos reales).
// Cuando los tengas, escríbelos entre las comillas:
//   TELEFONO  -> solo números, con prefijo si quieres. Ej: "+34600000000"
//   DIRECCION -> como la buscarías en Google Maps. Ej: "Calle Ejemplo 1, Portugalete"
// Mientras estén vacíos, los botones salen apagados y no hacen nada.
var TELEFONO = "";   // [PENDIENTE: teléfono real]
var DIRECCION = "";  // [PENDIENTE: dirección real]
// ============================================================

// Horario: 0 = domingo, 1 = lunes ... 6 = sábado
// Cada día tiene una lista de tramos [apertura, cierre] en minutos desde las 00:00
var HORARIO = {
  0: [[12 * 60, 15 * 60]],                          // domingo: solo mañana
  1: [],                                            // lunes: cerrado
  2: [[12 * 60, 15 * 60], [18 * 60, 22 * 60 + 30]],
  3: [[12 * 60, 15 * 60], [18 * 60, 22 * 60 + 30]],
  4: [[12 * 60, 15 * 60], [18 * 60, 22 * 60 + 30]],
  5: [[12 * 60, 15 * 60], [18 * 60, 22 * 60 + 30]],
  6: [[12 * 60, 15 * 60], [18 * 60, 22 * 60 + 30]]
};

var ahora = new Date();
var dia = ahora.getDay();
var minutos = ahora.getHours() * 60 + ahora.getMinutes();

// Resalta la fila de hoy en la tabla
var fila = document.querySelector('tr[data-dia="' + dia + '"]');
if (fila) {
  fila.classList.add('hoy');
}

// Dice si está abierto ahora
var abierto = HORARIO[dia].some(function (tramo) {
  return minutos >= tramo[0] && minutos < tramo[1];
});
var estado = document.getElementById('estado');
if (abierto) {
  estado.textContent = 'Abierto ahora';
  estado.classList.add('abierto');
} else {
  estado.textContent = 'Cerrado ahora';
  estado.classList.add('cerrado-ahora');
}

// Año del pie de página
document.getElementById('anio').textContent = ahora.getFullYear();


// Botones Llamar y Cómo llegar
var btnLlamar = document.getElementById('btn-llamar');
var btnMapa = document.getElementById('btn-mapa');

function apagar(boton, texto) {
  boton.removeAttribute('href');
  boton.setAttribute('aria-disabled', 'true');
  boton.classList.add('pendiente-dato');
  boton.textContent = texto;
}

if (TELEFONO) {
  btnLlamar.href = 'tel:' + TELEFONO;
} else {
  apagar(btnLlamar, 'Llamar (pendiente)');
}

if (DIRECCION) {
  btnMapa.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(DIRECCION);
  btnMapa.target = '_blank';
  btnMapa.rel = 'noopener';
} else {
  apagar(btnMapa, 'Cómo llegar (pendiente)');
}
