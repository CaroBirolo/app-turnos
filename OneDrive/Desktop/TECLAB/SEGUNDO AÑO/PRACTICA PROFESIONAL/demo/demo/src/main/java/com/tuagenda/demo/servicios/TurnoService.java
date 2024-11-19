package com.tuagenda.demo.servicios;

import com.tuagenda.demo.entidades.Turno;
import com.tuagenda.demo.repositorios.TurnosRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TurnoService {

    private final TurnosRepository turnosRepository;

    public TurnoService(TurnosRepository turnosRepository) {
        this.turnosRepository = turnosRepository;
    }

    // Crear un nuevo turno
    public Turno crearTurno(Turno turno) {
        return turnosRepository.save(turno);
    }

    // Obtener todos los turnos
    public List<Turno> getTodosLosTurnos() {
        return turnosRepository.findAll();
    }


    public List<LocalTime> getHorasDisponibles(Long tatuadorId, int mes, int anio, int duracionHoras) {
        LocalDateTime inicioMes = LocalDateTime.of(anio, mes, 1, 0, 0);
        LocalDateTime finMes = inicioMes.plusMonths(1);
        // Obtener los turnos existentes del tatuador en el mes especificado
        List<Turno> turnosOcupados = turnosRepository.findTurnosByTatuadorAndMes(tatuadorId, inicioMes, finMes);
        // Generar las horas disponibles por día
        List<LocalTime> horasDisponibles = new ArrayList<>();
        LocalTime inicioJornada = LocalTime.of(9, 0); // Ejemplo: jornada empieza a las 9:00
        LocalTime finJornada = LocalTime.of(18, 0); // Ejemplo: jornada termina a las 18:00

        for (LocalDate dia = inicioMes.toLocalDate(); dia.isBefore(finMes.toLocalDate()); dia = dia.plusDays(1)) {
            LocalTime hora = inicioJornada;

            while (hora.plusHours(duracionHoras).isBefore(finJornada.plusMinutes(1))) {
                LocalTime finalHora = hora;
                LocalDate finalDia = dia;
                boolean superpuesto = turnosOcupados.stream().anyMatch(turno ->
                        turno.getFechaDesde().toLocalDate().equals(finalDia) &&
                                (finalHora.isBefore(turno.getFechaHasta().toLocalTime()) && finalHora.plusHours(duracionHoras).isAfter(turno.getFechaDesde().toLocalTime()))
                );

                if (!superpuesto) {
                    horasDisponibles.add(hora);
                }
                hora = hora.plusMinutes(30); // Incremento de 30 minutos
            }
        }

        return horasDisponibles;
    }
}

