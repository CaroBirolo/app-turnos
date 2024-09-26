// Dropdown dependientes
const lugarDropdown = document.getElementById('lugar');
const tipoTatuajeDropdown = document.getElementById('tipo-tatuaje');

tipoTatuajeDropdown.addEventListener('change', function() {
    const tipoTatuaje = this.value;
    lugarDropdown.innerHTML = ''; // Limpiar opciones previas

    if (tipoTatuaje === 'tradicional') {
        lugarDropdown.innerHTML = '<option value="brazo">Brazo</option><option value="pierna">Pierna</option>';
    } else if (tipoTatuaje === 'realismo') {
        lugarDropdown.innerHTML = '<option value="espalda">Espalda</option><option value="pecho">Pecho</option>';
    }
});

// Funcionalidad ABM Turnos
const tablaTurnos = document.getElementById('tabla-turnos');
const agregarTurnoBtn = document.getElementById('agregar-turno');

agregarTurnoBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const tipoTatuaje = tipoTatuajeDropdown.value;
    const lugar = lugarDropdown.value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    if (tipoTatuaje && lugar && fecha && hora) {
        const turnoFila = document.createElement('tr');

        turnoFila.innerHTML = `
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
            tipoTatuajeDropdown.value = tipoTatuaje;
            lugarDropdown.innerHTML = lugar === 'brazo' || lugar === 'pierna' ? 
                '<option value="brazo">Brazo</option><option value="pierna">Pierna</option>' :
                '<option value="espalda">Espalda</option><option value="pecho">Pecho</option>';
            lugarDropdown.value = lugar;
            document.getElementById('fecha').value = fecha;
            document.getElementById('hora').value = hora;

            tablaTurnos.removeChild(turnoFila); // Eliminar la fila vieja
        });

        // Añadir turno a la tabla
        tablaTurnos.appendChild(turnoFila);

        // Limpiar inputs
        tipoTatuajeDropdown.value = '';
        lugarDropdown.innerHTML = '';
        document.getElementById('fecha').value = '';
        document.getElementById('hora').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
});