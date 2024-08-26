// Obtener los elementos del formulario
const btnRegistrarse = document.getElementById('btnRegistrarse');
const formularioRegistro = document.getElementById('form-registro');

// Ocultar el formulario de registro por defecto
//formularioRegistro.style.display = 'none';

// Agregar un evento al botón "Registrarse"
btnRegistrarse.addEventListener('click', () => {
    // Si el formulario está oculto, lo mostramos
    if (formularioRegistro.style.display === 'none') {
        formularioRegistro.style.display = 'block';
    } else {
        // Si ya está visible, lo ocultamos (aunque esto no es necesario en este caso)
        formularioRegistro.style.display = 'none';
    }
});

const tatuadorSelect = document.getElementById('tatuadorSelect');
const tipoTatuajeSelect = document.getElementById('tipoTatuajeSelect');

const estilosPorTatuador = {
    agostina: ['realista', 'lineal', 'acuarela', 'blackwork con toques de color'],
    nicolás: ['blackwork', 'geométrico', 'old school', 'neotradicional'],
    nuevoTatuador: ['japonés', 'tribal', 'lettering']
};

tatuadorSelect.addEventListener('change', () => {
    const tatuadorSeleccionado = tatuadorSelect.value;
    const estilosDisponibles = estilosPorTatuador[tatuadorSeleccionado] || [];

    tipoTatuajeSelect.disabled = false;
    tipoTatuajeSelect.innerHTML = '';

    estilosDisponibles.forEach(estilo => {
        const option = document.createElement('option');
        option.value = estilo;
        option.textContent = estilo;
        tipoTatuajeSelect.appendChild(option);
    });
});

// Obtener el botón de agendar turno
const btnAgendarTurno = document.getElementById('agendarTurno');

// Agregar un evento al botón "Agendar Turno"
btnAgendarTurno.addEventListener('click', () => {
    // Obtener los valores de los campos
    const tatuador = document.getElementById('tatuadorSelect').value;
    const tipoTatuaje = document.getElementById('tipoTatuajeSelect').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const nombre = document.getElementById('nombre_input').value;   


    // Validar si todos los campos están completos
    if (tatuador && tipoTatuaje && fecha && hora && nombre) {
        // Aquí podrías enviar los datos a un servidor
        alert('¡Turno agendado con éxito!');
    } else {
        alert('Por favor, completa todos los campos obligatorios.');
    }
});



