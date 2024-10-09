/*
que queden seleccionados los botones cuando clickeo


*/

document.addEventListener('DOMContentLoaded', () => {
    const tatuadores = ["agostina", "nicolás"];
    const estilosPorTatuador = {
        agostina: ['Obras de arte/pinturitas', 'Lineales', 'Kintsugi', 'Ramos de flores', 'Diseños disponibles', 'Personalizado'],
        nicolás: ['Anime fullcolor', 'Anime puntillismo', 'Anime en negro con detalles de color', 'Manga formato panel'],
    };
    const zonas = ["Brazo", "Pierna", "Pecho", "Espalda"];

    const tatuadorButtons = document.getElementById('tatuadorButtons');
    const tipoTatuajeButtons = document.getElementById('tipoTatuajeButtons');
    const zonaTatuajeButtons = document.getElementById('zonaTatuajeButtons');

    if (!zonaTatuajeButtons) {
        console.error('Elemento con ID zonaTatuajeButtons no encontrado.');
        return;
    }

    document.getElementById('divAgendar').style.display="none";
    document.getElementById('divDisponibilidad').style.display="none";
    document.getElementById('sectionCalendar').style.display="none";
    document.getElementById('sectionTipoTatuaje').style.display="none";

    let botonSeleccionado = null; // Almacenar el botón de tatuador seleccionado

    // Crear botones para cada tatuador
    tatuadores.forEach(tatuador => {
        const button = crearBotonTatuador(tatuador);
        tatuadorButtons.appendChild(button);
    });

    function crearBotonTatuador(tatuador) {
        const button = document.createElement('button');
        button.textContent = capitalizar(tatuador);
        button.classList.add('boton-tatuadores');
        button.addEventListener('click', () => seleccionarTatuador(tatuador, button));
        return button;
    }

    function seleccionarTatuador(tatuadorSeleccionado, boton) {
        
        document.getElementById('divAgendar').style.display="";
        document.getElementById('divDisponibilidad').style.display="";
        document.getElementById('sectionCalendar').style.display="";
        document.getElementById('sectionTipoTatuaje').style.display="";
        // Actualizar el botón seleccionado
        actualizarBotonSeleccionado(boton);

        // Generar botones de tipo de tatuaje
        generarBotonesEstilo(tatuadorSeleccionado);

        // Ocultar las zonas hasta seleccionar un estilo
        zonaTatuajeButtons.style.display = 'none';
    }

    function generarBotonesEstilo(tatuadorSeleccionado) {
        tipoTatuajeButtons.innerHTML = '';
        const estilosDisponibles = estilosPorTatuador[tatuadorSeleccionado] || [];

        estilosDisponibles.forEach(estilo => {
            const button = crearBotonEstilo(estilo);
            tipoTatuajeButtons.appendChild(button);
        });
    }

    function crearBotonEstilo(estilo) {
        const button = document.createElement('button');
        button.textContent = estilo;
        button.classList.add('boton-estilos');
        button.addEventListener('click', () => seleccionarEstilo(estilo, button));
        return button;
    }

    function seleccionarEstilo(estiloSeleccionado, boton) {
        actualizarBotonesEstilo(boton);
        zonaTatuajeButtons.style.display = 'flex'; // Mostrar el contenedor de zonas
        console.log(`Estilo seleccionado: ${estiloSeleccionado}`);
    }

    zonas.forEach(zona => {
        const button = crearBotonZona(zona);
        zonaTatuajeButtons.appendChild(button);
    });

    function crearBotonZona(zona) {
        const button = document.createElement('button');
        button.textContent = zona;
        button.classList.add('boton-zonas');
        button.addEventListener('click', () => seleccionarZona(zona, button));
        return button;
    }

    function seleccionarZona(zonaSeleccionada, boton) {
        actualizarZonaSeleccionada(boton);
        console.log(`Zona seleccionada: ${zonaSeleccionada}`);
    }

    function actualizarBotonSeleccionado(boton) {
        if (botonSeleccionado) {
            botonSeleccionado.classList.remove('btn-success');
            botonSeleccionado.classList.add('btn-primary');
        }
        boton.classList.remove('btn-primary');
        boton.classList.add('btn-success');
        botonSeleccionado = boton;
    }

    function actualizarBotonesEstilo(boton) {
        [...tipoTatuajeButtons.children].forEach(btn => btn.classList.remove('btn-success'));
        boton.classList.add('btn-success');
    }

    function actualizarZonaSeleccionada(boton) {
        const zonaPrevia = document.querySelector('.zonaSeleccionada');
        if (zonaPrevia) {
            zonaPrevia.classList.remove('zonaSeleccionada', 'btn-primary');
            zonaPrevia.classList.add('btn-secondary');
        }
        boton.classList.add('zonaSeleccionada', 'btn-primary');
        boton.classList.remove('btn-secondary');
    }

    function capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});

// Configuración del calendario
document.addEventListener('DOMContentLoaded', function () {
    const disabledDates = ["2024-08-28", "2024-08-29", "2024-09-01"];
    const redDates = ["2024-09-05", "2024-09-10"];

    flatpickr("#calendario", {
        disable: disabledDates,
        onDayCreate: function (dObj, dStr, fp, dayElem) {
            const date = dayElem.dateObj.toISOString().split('T')[0];
            if (redDates.includes(date)) {
                dayElem.classList.add('red');
            }
        }
    });
});

// Manejo de la respuesta de credenciales
function handleCredentialResponse(response) {
    const userObject = jwt_decode(response.credential); // Decodificar JWT
    console.log(userObject);

    // Enviar el token al backend para iniciar sesión
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential })
    }).then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
        });
}

const clickInstagram = () => {
    window.open('https://www.instagram.com/aggiegonz', '_blank');
};

