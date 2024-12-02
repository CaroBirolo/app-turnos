package com.tuagenda.demo.servicios;

import com.tuagenda.demo.dtos.AdminConTatuajesDTO;
import com.tuagenda.demo.dtos.CrearTurnoRequest;
import com.tuagenda.demo.entidades.Usuario;
import com.tuagenda.demo.repositorios.TipoTatuajeRepository;
import com.tuagenda.demo.repositorios.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final TipoTatuajeRepository tipoTatuajeRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, TipoTatuajeRepository tipoTatuajeRepository) {
        this.usuarioRepository = usuarioRepository;
        this.tipoTatuajeRepository = tipoTatuajeRepository;
    }

    public void actualizarUsuario(CrearTurnoRequest request) {
        Usuario usuario = this.usuarioRepository.findByEmail(request.getEmailCliente()).get();
        usuario.setNotasAdicionales(request.getNotasAdicionales());
        usuario.setNombre(request.getNombreCliente());
        usuario.setTelefono(request.getTelefono());
        this.usuarioRepository.save(usuario);
    }

    public List<AdminConTatuajesDTO> obtenerAdminsConTiposDeTatuajes() {
        List<Usuario> admins = usuarioRepository.findAllAdmins();

        return admins.stream()
                .map(admin -> new AdminConTatuajesDTO(
                        admin.getNombre(),
                        admin.getEmail(),
                        this.tipoTatuajeRepository.findByTatuadorId(admin.getId())

                ))
                .collect(Collectors.toList());
    }
}
