package com.tuagenda.demo.controladores;

import com.tuagenda.demo.dtos.AdminConTatuajesDTO;
import com.tuagenda.demo.dtos.UsuarioDTO;
import com.tuagenda.demo.entidades.Usuario;
import com.tuagenda.demo.repositorios.UsuarioRepository;
import com.tuagenda.demo.servicios.EmailService;
import com.tuagenda.demo.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioRepository.save(usuario);
            return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<Usuario> actualizarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
            LocalTime fechaDesde = LocalTime.parse(usuarioDTO.getFechaDesde(), formatter);
            LocalTime fechaHasta = LocalTime.parse(usuarioDTO.getFechaHasta(), formatter);

            Usuario usuario = this.usuarioRepository.findByEmail(usuarioDTO.getEmail()).get();
            usuario.setTemplateEmail(usuarioDTO.getEmailTemplate());
            usuario.setHoraApertura(fechaDesde);
            usuario.setHoraCierre(fechaHasta);
            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            return new ResponseEntity<>(usuarioActualizado, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/email")
    public ResponseEntity<Usuario> obtenerUsuarioPorEmail(@RequestParam String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        if(usuario.isEmpty()){
            Usuario newUsuario = new Usuario();
            newUsuario.setRol(Usuario.Rol.usuario);
            newUsuario.setEmail(email);
            usuarioRepository.save(newUsuario);
            usuario = usuarioRepository.findByEmail(email);
        }
        return usuario.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/admins-con-tipos")
    public ResponseEntity<List<AdminConTatuajesDTO>> obtenerAdminsConTiposDeTatuajes() {
        List<AdminConTatuajesDTO> admins = usuarioService.obtenerAdminsConTiposDeTatuajes();
        return ResponseEntity.ok(admins);
    }

    @Autowired
    private EmailService emailService;

    @PostMapping("/enviar-correo")
    public ResponseEntity<String> enviarCorreo(@RequestParam String email) {
        try {
            String asunto = "Confirmación de Turno";
            String mensaje = "Gracias por reservar tu turno :)\n" +
                    "\n" +
                    "Te recuerdo que el mismo sera el dia a las . El alias es aggiegonz (María Agostina González). La seña es de $5000 (no reembolsable y válida únicamente para el turno coordinado), recorda que luego de tomado el turno, debes enviar dentro de las proximas 48hs el comprobante de la transferencia a este mismo mail para que el turno sea reconfirmado. En caso de no hacerlo, pasadas las 48hs el mismo sera cancelado automáticamente. \n" +
                    "La dire es Belgrano 2797, timbre 4. Por favor asistir sin acompañantes y no usar cremas anestésicas. La tolerancia máxima es de 10 min.\n" +
                    "\n" +
                    "Nos vemos pronto ✨";
            emailService.enviarCorreo(email, asunto, mensaje);
            return ResponseEntity.ok("Correo enviado con éxito a " + email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al enviar el correo: " + e.getMessage());
        }
    }
}

