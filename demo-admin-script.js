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

// Llamada al backend y renderización de la lista TODOS
fetch(`http://localhost:8080/api/turnos/all?emailTatuador=${emailTatuador}`)
.then(response => {
    if (!response.ok) throw new Error('Error al obtener los turnos');
    return response.json();
})
.then(turnos => {
    const listaTurnos = document.getElementById('lista-turnos-todos');
    listaTurnos.innerHTML = '';
    turnos.forEach(turno => {
        const elemento = crearElementoTurno(turno);
        elemento.style.display="flex";
        elemento.style["justify-content"]="space-between";
        let button = document.createElement('button')
        button.value="eliminar";
        button.innerHTML="eliminar";
        button.onclick = ()=>{
            deleteTurno(turno.id);
        }
        elemento.appendChild(button);
        listaTurnos.appendChild(elemento);
    });
})
.catch(error => {
    console.error('Error:', error);
});

function deleteTurno(id){
    fetch(`http://localhost:8080/api/turnos?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': '*/*'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        console.log("Turno eliminado exitosamente.");
    })
    .catch(error => {
        console.error("Error en el fetch:", error);
    });
}



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


fetch('http://localhost:8080/usuarios/admins-con-tipos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        estilos = new Set(data.find(t=>t.email == emailTatuador).tiposDeTatuajes.map(tt=>tt.estilo.split('-')[0]));       
        let options = "";
        estilos.forEach(estilo=>{
            options+=`<option value="${estilo}">${estilo}</option>`;
        })
        document.getElementById("tipo-tatuaje").innerHTML=options;
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

document.getElementById("agregar-turno").onclick = ()=>{
    let fechaSeleccionada = document.getElementById("fecha").value;
    let horaSeleccionada = document.getElementById("hora").value;
    const fechaYHora = `${fechaSeleccionada}T${horaSeleccionada}`; 
    const data = {
        emailCliente: document.getElementById("email").value,
        nombreCliente:document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        notasAdicionales: "",
        emailTatuador: emailTatuador,
        estiloTatuaje: document.getElementById("tipo-tatuaje").value+"-"+document.getElementById("lugar").value,
        fechaYHora: fechaYHora
    };

    fetch('http://localhost:8080/api/turnos/crear', {
        method: 'POST', 
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convertir el objeto a JSON
    })
    .then(response => response.json()) // Convertir la respuesta en formato JSON
    .then(data => {
        console.log('Respuesta del servidor:', data); // Aquí procesas la respuesta
    })
    .catch(error => {
        console.error('Error en la solicitud:', error); // Manejo de errores
    }); 
}