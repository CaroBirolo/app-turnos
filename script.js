document.addEventListener('DOMContentLoaded', () => {
    const tatuadores = ["agostina", "nicolás"];
    const estilosPorTatuador = {
        agostina: ['Obras de arte/pinturitas', 'Lineales', 'Kintsugi', 'Ramos de flores', 'Diseños disponibles', 'Personalizado'],
        nicolás: ['blackwork', 'geométrico', 'old school', 'neotradicional'],
    };
    const zonas = ["Brazo", "Pierna"];

    const tatuadorButtons = document.getElementById('tatuadorButtons');
    const tipoTatuajeButtons = document.getElementById('tipoTatuajeButtons');
    const zonaTatuajeButtons = document.getElementById('zonaTatuajeButtons');

    if (!zonaTatuajeButtons) {
        console.error('Elemento con ID zonaTatuajeButtons no encontrado.');
        return;
    }

    // Ocultar el contenedor de botones de zona al iniciar
    zonaTatuajeButtons.style.display = 'none';

    // Variable para almacenar el botón seleccionado
    let botonSeleccionado = null;

    // Crear botones para cada tatuador
    tatuadores.forEach(tatuador => {
        const button = document.createElement('button');
        button.textContent = tatuador.charAt(0).toUpperCase() + tatuador.slice(1); // Capitalizar el nombre
        button.classList.add('boton-tatuadores');
        button.addEventListener('click', () => seleccionarTatuador(tatuador, button));
        tatuadorButtons.appendChild(button);
    });

    function seleccionarTatuador(tatuadorSeleccionado, boton) {
        // Desmarcar el botón previamente seleccionado
        if (botonSeleccionado) {
            botonSeleccionado.classList.remove('btn-success');
            botonSeleccionado.classList.add('btn-primary');
        }

        // Marcar el botón recién seleccionado
        boton.classList.remove('btn-primary');
        boton.classList.add('btn-success');
        botonSeleccionado = boton;

        // Limpiar y generar botones de tipo de tatuaje
        tipoTatuajeButtons.innerHTML = '';
        const estilosDisponibles = estilosPorTatuador[tatuadorSeleccionado] || [];

        estilosDisponibles.forEach(estilo => {
            const tipoButton = document.createElement('button');
            tipoButton.classList.add('boton-estilos');
            tipoButton.textContent = estilo;
            tipoButton.addEventListener('click', () => seleccionarEstilo(estilo, tipoButton));
            tipoTatuajeButtons.appendChild(tipoButton);
        });

        // Ocultar las zonas hasta que se seleccione un estilo
        zonaTatuajeButtons.style.display = 'none';
    }

    function seleccionarEstilo(estiloSeleccionado, boton) {
        // Desmarcar todos los botones de estilo
        [...tipoTatuajeButtons.children].forEach(btn => btn.classList.remove('btn-success'));
        
        // Marcar el botón seleccionado
        boton.classList.add('btn-success');
        
        // Mostrar el contenedor de botones de zona
        zonaTatuajeButtons.style.display = 'flex'; // O 'block', dependiendo de cómo quieras mostrarlo
        
        console.log(`Estilo seleccionado: ${estiloSeleccionado}`);
    }

    zonas.forEach(zona => {
        const button = document.createElement('button');
        button.innerText = zona;
        button.className = 'boton-zonas';
        button.addEventListener('click', () => seleccionarZona(zona, button));
        zonaTatuajeButtons.appendChild(button);
    });
    
    function seleccionarZona(zonaSeleccionada, boton) {
        // Desactivar el botón seleccionado anteriormente (si lo hay)
        const zonaPrevia = document.querySelector('.zonaSeleccionada');
        if (zonaPrevia) {
            zonaPrevia.classList.remove('zonaSeleccionada');
            zonaPrevia.classList.remove('btn-primary');
            zonaPrevia.classList.add('btn-secondary');
        }
        
        // Activar el botón seleccionado actualmente
        boton.classList.add('zonaSeleccionada');
        boton.classList.remove('btn-secondary');
        boton.classList.add('btn-primary');
        console.log(`Zona seleccionada: ${zonaSeleccionada}`);
    }
});


// Configuración del calendario
document.addEventListener('DOMContentLoaded', function() {
    const disabledDates = ["2024-08-28", "2024-08-29", "2024-09-01"];
    const redDates = ["2024-09-05", "2024-09-10"];

    flatpickr("#calendario", {
        disable: disabledDates,
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            const date = dayElem.dateObj.toISOString().split('T')[0];
            if (redDates.includes(date)) {
                dayElem.classList.add('red');
            }
        }
    });
});