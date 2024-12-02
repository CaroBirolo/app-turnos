package com.tuagenda.demo.controladores;

import com.tuagenda.demo.dtos.CrearTurnoRequest;
import com.tuagenda.demo.dtos.HorasDisponiblesDTO;
import com.tuagenda.demo.dtos.TurnosDTO;
import com.tuagenda.demo.entidades.Turno;
import com.tuagenda.demo.repositorios.TurnosRepository;
import com.tuagenda.demo.servicios.EmailService;
import com.tuagenda.demo.servicios.TurnoService;
import com.tuagenda.demo.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/turnos")
public class TurnoController {

    private final TurnoService turnoService;
    private final TurnosRepository turnosRepository;
    private final UsuarioService usuarioService;

    public TurnoController(TurnoService turnoService, TurnosRepository turnosRepository, UsuarioService usuarioService) {
        this.turnoService = turnoService;
        this.turnosRepository = turnosRepository;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearTurno(@RequestBody CrearTurnoRequest request) {
        try {
            Turno turno = turnoService.crearTurno(request);
            this.usuarioService.actualizarUsuario(request);
            return ResponseEntity.ok(turno);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/disponibles")
    public List<HorasDisponiblesDTO> obtenerHorasDisponibles(
            @RequestParam String emailTatuador,
            @RequestParam String mes, // Formato "YYYY-MM"
            @RequestParam String estiloTatuaje
    ) {
        LocalDate mesInicio = LocalDate.parse(mes + "-01");
        return turnoService.obtenerHorasDisponibles(emailTatuador, estiloTatuaje, mesInicio);
    }

    // Obtener todos los turnos
    @GetMapping("/proximos-dos-dias")
    public ResponseEntity<List<TurnosDTO>> getUltimosDosDias(@RequestParam String emailTatuador) {
        List<TurnosDTO> turnos = turnoService.getTurnosUltimaSemana(emailTatuador);
        return ResponseEntity.ok(turnos);
    }

    // Obtener todos los turnos
    @GetMapping("/all")
    public ResponseEntity<List<TurnosDTO>> getTodosLosTurnos(@RequestParam String emailTatuador) {
        List<TurnosDTO> turnos = turnoService.getAll(emailTatuador);
        return ResponseEntity.ok(turnos);
    }

    @DeleteMapping()
    public void delete(@RequestParam Long id){
        this.turnosRepository.deleteById(id);
    }
    @RestController
    @RequestMapping("/api/turnos")
    public class TurnosController {

        @Autowired
        private EmailService emailService;

        @PostMapping("/agendar")
        public String agendarTurno(@RequestParam String destinatario) {
            String asunto = "Confirmación de turno";
            String mensaje = "¡Gracias por agendar tu turno! Aquí están los detalles.";
            emailService.enviarCorreo(destinatario, asunto, mensaje);

            
            return "Correo enviado con éxito a: " + destinatario;
        }
    }
}
