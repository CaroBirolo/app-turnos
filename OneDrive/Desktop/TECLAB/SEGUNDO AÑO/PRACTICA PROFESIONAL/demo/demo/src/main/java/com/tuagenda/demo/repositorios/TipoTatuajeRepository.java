package com.tuagenda.demo.repositorios;

import com.tuagenda.demo.entidades.TipoTatuaje;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoTatuajeRepository extends JpaRepository<TipoTatuaje, Long> {
    List<TipoTatuaje> findByTatuadorId(Long tatuadorId);
}

