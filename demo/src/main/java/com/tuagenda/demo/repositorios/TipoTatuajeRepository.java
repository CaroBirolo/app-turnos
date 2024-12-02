package com.tuagenda.demo.repositorios;

import com.tuagenda.demo.entidades.TipoTatuaje;
import com.tuagenda.demo.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TipoTatuajeRepository extends JpaRepository<TipoTatuaje, Long> {
    List<TipoTatuaje> findByTatuadorId(Long tatuadorId);
    Optional<TipoTatuaje> findByEstiloAndTatuador(String estilo, Usuario tatuador);
}

