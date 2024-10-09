// Dropdown dependientes
const lugarDropdown = document.getElementById('lugar');
const tipoTatuajeDropdown = document.getElementById('tipo-tatuaje');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const telefonoInput = document.getElementById('telefono');
const fechaInput = document.getElementById('fecha');
const horaInput = document.getElementById('hora');

// Funcionalidad ABM Turnos
const tablaTurnos = document.getElementById('tabla-turnos');
const agregarTurnoBtn = document.getElementById('agregar-turno');

agregarTurnoBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const telefono = telefonoInput.value;
    const tipoTatuaje = tipoTatuajeDropdown.value;
    const lugar = lugarDropdown.value;
    const fecha = fechaInput.value;
    const hora = horaInput.value;

    if (nombre && apellido && telefono && tipoTatuaje && lugar && fecha && hora) {
        const turnoFila = document.createElement('tr');

        turnoFila.innerHTML = `
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${telefono}</td>
            <td>${tipoTatuaje}</td>
            <td>${lugar}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>
                <button class="btn btn-warning btn-sm editar-turno">Editar</button>
                <button class="btn btn-danger btn-sm eliminar-turno">Eliminar</button>
            </td>
        `;

        // Agregar evento de eliminar
        turnoFila.querySelector('.eliminar-turno').addEventListener('click', function() {
            tablaTurnos.removeChild(turnoFila);
        });

        // Agregar evento de editar
        turnoFila.querySelector('.editar-turno').addEventListener('click', function() {
            nombreInput.value = nombre;
            apellidoInput.value = apellido;
            telefonoInput.value = telefono;
            tipoTatuajeDropdown.value = tipoTatuaje;
            lugarDropdown.value = lugar;
            fechaInput.value = fecha;
            horaInput.value = hora;
            tablaTurnos.removeChild(turnoFila); // Eliminar la fila vieja
        });

        // Añadir turno a la tabla
        tablaTurnos.appendChild(turnoFila);

        // Limpiar inputs
        nombreInput.value = '';
        apellidoInput.value = '';
        telefonoInput.value = '';
        tipoTatuajeDropdown.value = '';
        lugarDropdown.value = '';
        fechaInput.value = '';
        horaInput.value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
});