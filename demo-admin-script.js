const queryParams = new URLSearchParams(window.location.search);
const emailTatuador = queryParams.get('email');
var usuario = null;
 
 
 // Función para formatear la fecha y hora
function formatFechaHora(fechaDesde) {
    const fecha = new Date(fechaDesde);
    const opcionesFecha = { day: 'numeric', month: 'long' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: true };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    return `${fechaFormateada} - ${horaFormateada}`;
}

  // Función para crear un elemento <li> para cada turno
function crearElementoTurno(turno) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${formatFechaHora(turno.fechaDesde)} - Cliente: ${turno.nombreCompleto}`;
    return li;
}

  // Llamada al backend y renderización de la lista
fetch(`http://localhost:8080/api/turnos/proximos-dos-dias?emailTatuador=${emailTatuador}`)
.then(response => {
    if (!response.ok) throw new Error('Error al obtener los turnos');
    return response.json();
})
.then(turnos => {
    const listaTurnos = document.getElementById('lista-turnos');
    listaTurnos.innerHTML = '';
    turnos.forEach(turno => {
        const elemento = crearElementoTurno(turno);
        listaTurnos.appendChild(elemento);
    });
})
.catch(error => {
    console.error('Error:', error);
});



const url = `http://localhost:8080/usuarios/email?email=${encodeURIComponent(emailTatuador)}`;
fetch(url, {
    method: 'GET',
    headers: {
        'accept': '*/*' // Encabezado requerido
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    return response.json(); // Si el backend devuelve JSON
})
.then(data => {
    usuario = data;
    document.getElementById("hora-apertura").value = usuario.horaApertura;
    document.getElementById("hora-cierre").value = usuario.horaCierre;
    document.getElementById("template-email").value = usuario.templateEmail;
})
.catch(error => {
    console.error('Error:', error);
});









document.getElementById("guardar").onclick = ()=> {
    fetch('http://localhost:8080/usuarios', {
        method: 'PUT',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fechaDesde: document.getElementById("hora-apertura").value,
            fechaHasta: document.getElementById("hora-cierre").value,
            emailTemplate:document.getElementById("template-email").value,
            email: emailTatuador
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json(); // Si esperas JSON como respuesta
    })
    .then(data => {
        console.log("Respuesta del servidor:", data);
    })
    .catch(error => {
        console.error("Error en el fetch:", error);
    });
}
















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