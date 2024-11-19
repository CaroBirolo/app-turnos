package com.tuagenda.demo.controladores;

import com.tuagenda.demo.entidades.Turno;
import com.tuagenda.demo.servicios.TurnoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turnos")
public class TurnoController {

    private final TurnoService turnoService;

    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    // Crear un nuevo turno
    @PostMapping
    public ResponseEntity<Turno> crearTurno(@RequestBody Turno turno) {
        Turno nuevoTurno = turnoService.crearTurno(turno);
        return ResponseEntity.ok(nuevoTurno);
    }

   /* // Obtener turnos de un tatuador específico
    @GetMapping("/tatuador/{idTatuador}")
    public ResponseEntity<List<Turno>> getTurnosPorTatuador(@PathVariable Long idTatuador) {
        List<Turno> turnos = turnoService.getTurnosPorTatuador(idTatuador);
        return ResponseEntity.ok(turnos);
    }

    // Obtener turnos de un cliente específico
    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<Turno>> getTurnosPorCliente(@PathVariable Long idCliente) {
        List<Turno> turnos = turnoService.getTurnosPorCliente(idCliente);
        return ResponseEntity.ok(turnos);
    }*/

    // Obtener todos los turnos
    @GetMapping
    public ResponseEntity<List<Turno>> getTodosLosTurnos() {
        List<Turno> turnos = turnoService.getTodosLosTurnos();
        return ResponseEntity.ok(turnos);
    }
}
