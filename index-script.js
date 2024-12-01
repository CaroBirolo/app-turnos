var dataTatuadores = null;
var dataDias = null;
var tatuadores = [];
var fechaSeleccionada = null;
var horaSeleccionada = null;
var estilosPorTatuador = {};
var botonTatuadorSeleccionado = null;
var botonEstiloSeleccionado = null;
var botonZonaSeleccionado = null


document.addEventListener('DOMContentLoaded', () => {


    fetch('http://localhost:8080/usuarios/admins-con-tipos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
            dataTatuadores = data;
            data.forEach(tatuador => {
                tatuadores.push(tatuador.nombre);
                estilosPorTatuador[tatuador.nombre] = new Set(tatuador.tiposDeTatuajes.map(tt=>tt.estilo.split('-')[0]));
            })
                // Crear botones para cada tatuador
            tatuadores.forEach(tatuador => {
                const button = crearBotonTatuador(tatuador);
                tatuadorButtons.appendChild(button);
                
            });
        });
    

    /*const estilosPorTatuador = {
        agostina: ['Obras de arte/pinturitas', 'Lineales', 'Kintsugi', 'Ramos de flores', 'Diseños disponibles', 'Personalizado'],
        nicolás: ['Anime fullcolor', 'Anime puntillismo', 'Anime en negro con detalles de color', 'Manga formato panel'],
    };*/
    const zonas = ["brazo", "pierna", "pecho", "espalda"];

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

    function crearBotonTatuador(tatuador) {
        const button = document.createElement('button');
        button.textContent = tatuador;
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
        actualizarTatuadorBotonSeleccionado(boton);

        // Generar botones de tipo de tatuaje
        generarBotonesEstilo(tatuadorSeleccionado);

        // Ocultar las zonas hasta seleccionar un estilo
        zonaTatuajeButtons.style.display = 'none';

        [...zonaTatuajeButtons.children].forEach(btn => btn.classList.remove('btn-selected'));
        botonZonaSeleccionado = null;

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
        button.addEventListener('click', () => seleccionarEstilo(button));
        return button;
    }

    function seleccionarEstilo(boton) {
        actualizarBotonesEstilo(boton);
        zonaTatuajeButtons.style.display = 'flex';
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

    function actualizarTatuadorBotonSeleccionado(boton) {
        if (botonTatuadorSeleccionado) {
            botonTatuadorSeleccionado.classList.remove('btn-selected');
            botonTatuadorSeleccionado.classList.add('btn-secondary');
        }
        boton.classList.remove('btn-secondary');
        boton.classList.add('btn-selected');
        botonTatuadorSeleccionado = boton;
    }

    function actualizarBotonesEstilo(boton) {
        [...tipoTatuajeButtons.children].forEach(btn => btn.classList.remove('btn-selected'));
        boton.classList.add('btn-selected');
        botonEstiloSeleccionado = boton;
    }

    function actualizarZonaSeleccionada(boton) {
        if (botonZonaSeleccionado) {
            botonZonaSeleccionado.classList.remove('btn-selected');
            botonZonaSeleccionado.classList.add('btn-secondary');
        }
        boton.classList.add('btn-selected');
        boton.classList.remove('btn-secondary');
        botonZonaSeleccionado = boton;
        getHorarios();
    }

    function getHorarios(){
        const today = new Date();
        const yearMonth = today.toISOString().slice(0, 7);

        const url = 'http://localhost:8080/api/turnos/disponibles';
        const params = new URLSearchParams({
            emailTatuador: dataTatuadores.find(t => t.nombre ==  botonTatuadorSeleccionado.innerHTML).email,
            mes: yearMonth,
            estiloTatuaje: botonEstiloSeleccionado.innerHTML+"-"+botonZonaSeleccionado.innerHTML
        });

        fetch(`${url}?${params}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Si esperas un JSON como respuesta
        })
        .then(data => {
            dataDias = data;
            console.log('Datos recibidos:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

// Configuración del calendario
document.addEventListener('DOMContentLoaded', function () {

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    flatpickr("#calendario", {
        enable: [
            function (date) {
                // Verificar si la fecha está dentro del mes actual
                const isWithinMonth = date >= startOfMonth && date <= endOfMonth;
                // Verificar si es día de semana (1: lunes, ..., 5: viernes)
                const isWeekday = date.getDay() >= 1 && date.getDay() <= 5; 
                return isWithinMonth && isWeekday;
            }
        ],
        onChange: function (selectedDates, dateStr, instance) {
            console.log("Fecha seleccionada:", dateStr);
            fechaSeleccionada = dateStr;
            completarHoras(dataDias.find(d=>d.dia == dateStr).horasDisponibles);
        },
        onDayCreate: function (dObj, dStr, fp, dayElem) {
            const date = dayElem.dateObj.toISOString().split('T')[0];
            if (date === today.toISOString().split('T')[0]) {
                dayElem.classList.add('today-highlight');
            }
        }
    });

});


var horaDropdown = document.getElementById("hora");
horaDropdown.onchange = () => {
    horaSeleccionada = horaDropdown.value;
}

function completarHoras(horasDisponibles) {
    const selectHora = document.getElementById('hora');

    // Limpiar las opciones actuales (excepto la primera)
    selectHora.innerHTML = '<option value="">Disponibilidad</option>';

    // Agregar las nuevas horas disponibles
    horasDisponibles.forEach(hora => {
        const option = document.createElement('option');
        option.value = hora; // Valor del option
        option.textContent = `${hora} hs`; // Texto visible
        selectHora.appendChild(option);
    });
}

document.getElementById("agendarTurno").onclick = ()=>{
    const fechaYHora = `${fechaSeleccionada}T${horaSeleccionada}.000Z`;
    const data = {
        emailCliente: "caro@caro.com",
        emailTatuador: dataTatuadores.find(t => t.nombre ==  botonTatuadorSeleccionado.innerHTML).email,
        estiloTatuaje: botonEstiloSeleccionado.innerHTML+"-"+botonZonaSeleccionado.innerHTML,
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


// Manejo de la respuesta de credenciales
function handleCredentialResponse(response) {
    let spUserNname = document.getElementById("spUserNname");
    let googleDiv = document.getElementById("googleDiv"); 
    let divTatuador = document.getElementById("divTatuador");
    let nombre = document.getElementById("nombre");

    const userObject = jwt_decode(response.credential); // Decodificar JWT
    spUserNname.innerHTML = userObject.given_name +" "+userObject.family_name;
    nombre.value = userObject.given_name +" "+userObject.family_name;
    googleDiv.style.visibility = 'hidden';
    divTatuador.style.display ="";
    console.log(userObject);
    completarCampos(userObject.email);
}

function completarCampos(email) {
    const url = `http://localhost:8080/usuarios/email?email=${encodeURIComponent(email)}`;

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
            document.getElementById("telefono_input").value = data.telefono;
            document.getElementById("notas_input").value = data.notasAdicionales;
            console.log('Datos del usuario:', data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const clickInstagram = () => {
    window.open('https://www.instagram.com/aggiegonz', '_blank');
};

