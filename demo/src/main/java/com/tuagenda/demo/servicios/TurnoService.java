package com.tuagenda.demo.servicios;

import com.tuagenda.demo.dtos.HorasDisponiblesDTO;
import com.tuagenda.demo.dtos.CrearTurnoRequest;
import com.tuagenda.demo.dtos.TurnosDTO;
import com.tuagenda.demo.entidades.TipoTatuaje;
import com.tuagenda.demo.entidades.Turno;
import com.tuagenda.demo.entidades.Usuario;
import com.tuagenda.demo.repositorios.TipoTatuajeRepository;
import com.tuagenda.demo.repositorios.TurnosRepository;
import com.tuagenda.demo.repositorios.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TurnoService {

    private final TurnosRepository turnosRepository;
    private final UsuarioRepository usuarioRepository;
    private final TipoTatuajeRepository tipoTatuajeRepository;

    public TurnoService(TurnosRepository turnosRepository, UsuarioRepository usuarioRepository, TipoTatuajeRepository tipoTatuajeRepository) {
        this.turnosRepository = turnosRepository;
        this.usuarioRepository = usuarioRepository;
        this.tipoTatuajeRepository = tipoTatuajeRepository;
    }

    public Turno crearTurno(CrearTurnoRequest request) {
        // Buscar cliente por email
        Usuario cliente = usuarioRepository.findByEmail(request.getEmailCliente())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));

        // Buscar tatuador por email
        Usuario tatuador = usuarioRepository.findByEmail(request.getEmailTatuador())
                .orElseThrow(() -> new IllegalArgumentException("Tatuador no encontrado"));

        // Buscar tipo de tatuaje por estilo y tatuador
        TipoTatuaje tipoTatuaje = tipoTatuajeRepository.findByEstiloAndTatuador(request.getEstiloTatuaje(), tatuador)
                .orElseThrow(() -> new IllegalArgumentException("Estilo de tatuaje no encontrado para el tatuador"));

        // Crear y configurar el turno
        Turno turno = new Turno();
        turno.setCliente(cliente);
        turno.setTatuador(tatuador);
        turno.setTipoTatuaje(tipoTatuaje);

        // Calcular fechas (Ejemplo: inicia ahora y dura según la duración del tipo de tatuaje)
        turno.setFechaDesde(request.getFechaYHora());
        turno.setFechaHasta(request.getFechaYHora().plusHours(tipoTatuaje.getDuracionHoras()));

        // Guardar el turno en la base
        return turnosRepository.save(turno);
    }

    // Crear un nuevo turno
    public Turno crearTurno(Turno turno) {
        return turnosRepository.save(turno);
    }

    // Obtener todos los turnos
    public List<Turno> getTodosLosTurnos() {
        return turnosRepository.findAll();
    }

    public List<TurnosDTO> getTurnosUltimaSemana(String email) {
        List<TurnosDTO> lstTurnos = new ArrayList<>();
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime fin = ahora.plus(2, ChronoUnit.DAYS);
        LocalDateTime inicio = ahora;
        turnosRepository.findTurnosByTatuadorAndMes(email, inicio, fin).stream().forEach(turno->{
            TurnosDTO turnosDTO = new TurnosDTO();
            turnosDTO.setId(turno.getId());
            turnosDTO.setEmail(turno.getCliente().getEmail());
            turnosDTO.setNombreCompleto(turno.getCliente().getNombre());
            turnosDTO.setTelefono(turno.getCliente().getTelefono());
            turnosDTO.setEstilo(turno.getTipoTatuaje().getEstilo());
            turnosDTO.setFechaDesde(turno.getFechaDesde());
            turnosDTO.setFechaHasta(turno.getFechaHasta());
            lstTurnos.add(turnosDTO);
        });
        return lstTurnos;
    }

    public List<TurnosDTO> getAll(String email) {
        List<TurnosDTO> lstTurnos = new ArrayList<>();
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime fin = ahora.plus(2, ChronoUnit.CENTURIES);
        LocalDateTime inicio = ahora;
        turnosRepository.findTurnosByTatuadorAndMes(email, inicio, fin).stream().forEach(turno->{
            TurnosDTO turnosDTO = new TurnosDTO();
            turnosDTO.setId(turno.getId());
            turnosDTO.setEmail(turno.getCliente().getEmail());
            turnosDTO.setNombreCompleto(turno.getCliente().getNombre());
            turnosDTO.setTelefono(turno.getCliente().getTelefono());
            turnosDTO.setEstilo(turno.getTipoTatuaje().getEstilo());
            turnosDTO.setFechaDesde(turno.getFechaDesde());
            turnosDTO.setFechaHasta(turno.getFechaHasta());
            lstTurnos.add(turnosDTO);
        });
        return lstTurnos;
    }


    public List<HorasDisponiblesDTO> obtenerHorasDisponibles(String emailTatuador, String estilotatuaje, LocalDate mes) {
        // Convertir el mes (LocalDate) al rango de inicio y fin en LocalDateTime
        LocalDateTime inicioMes = mes.atStartOfDay(); // Ejemplo: 2024-12-01T00:00:00
        LocalDateTime finMes = mes.plusMonths(1).atStartOfDay().minusSeconds(1); // Ejemplo: 2024-12-31T23:59:59

        // Obtener los turnos existentes para el tatuador en el rango de fechas
        List<Turno> turnos = turnosRepository.findTurnosByTatuadorAndMes(emailTatuador, inicioMes, finMes);

        // Obtener la duración del tipo de tatuaje
        Usuario tatuador = usuarioRepository.findByEmail(emailTatuador)
                .orElseThrow(() -> new IllegalArgumentException("Tatuador no encontrado"));
        TipoTatuaje tipoTatuaje = tipoTatuajeRepository.findByEstiloAndTatuador(estilotatuaje, tatuador)
                .orElseThrow(() -> new IllegalArgumentException("Estilo de tatuaje no encontrado para el tatuador"));

        // Generar días del mes
        List<LocalDate> diasDelMes = mes.datesUntil(mes.plusMonths(1)).collect(Collectors.toList());

        List<HorasDisponiblesDTO> horasDisponiblesList = new ArrayList<>();

        for (LocalDate dia : diasDelMes) {
            // Filtrar turnos reservados para el día actual
            List<Turno> turnosDelDia = turnos.stream()
                    .filter(t -> t.getFechaDesde().toLocalDate().equals(dia))
                    .collect(Collectors.toList());

            // Extraer las horas ocupadas de esos turnos
            List<LocalTime> horasOcupadas = turnosDelDia.stream()
                    .flatMap(t -> {
                        LocalTime inicio = t.getFechaDesde().toLocalTime();
                        LocalTime fin = t.getFechaDesde().toLocalTime().plusHours(t.getTipoTatuaje().getDuracionHoras());

                        // Generar una lista de todas las horas en el rango [inicio, fin)
                        List<LocalTime> horasEnRango = new ArrayList<>();
                        for (LocalTime hora = inicio; hora.isBefore(fin); hora = hora.plusHours(1)) {
                            horasEnRango.add(hora);
                        }

                        return horasEnRango.stream(); // Convertir la lista a stream para continuar
                    })
                    .collect(Collectors.toList());

            // Generar todas las horas posibles en el día
            List<LocalTime> todasLasHoras = generarHorasDisponiblesEnDia(horasOcupadas,tatuador.getHoraApertura(), tatuador.getHoraCierre(), tipoTatuaje.getDuracionHoras());

            horasDisponiblesList.add(new HorasDisponiblesDTO(dia, todasLasHoras));
        }

        return horasDisponiblesList;
    }

    private List<LocalTime> generarHorasDisponiblesEnDia(List<LocalTime> horasOcupadas,LocalTime inicio, LocalTime cierre, int duracion) {
        List<LocalTime> disponibles = new ArrayList<>();
        while (inicio.plusHours(duracion).isBefore(cierre.plusSeconds(1))) {
            LocalTime finalInicio = inicio;
            if (horasOcupadas.stream().noneMatch(h -> h.equals(finalInicio))) {
                disponibles.add(inicio);
            }
            inicio = inicio.plusMinutes(60);
        }
        return disponibles;
    }
}