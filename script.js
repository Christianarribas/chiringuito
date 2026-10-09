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
