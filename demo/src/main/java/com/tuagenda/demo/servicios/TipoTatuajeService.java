package com.tuagenda.demo.servicios;

import com.tuagenda.demo.entidades.TipoTatuaje;
import com.tuagenda.demo.repositorios.TipoTatuajeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoTatuajeService {

    private final TipoTatuajeRepository tipoTatuajeRepository;

    public TipoTatuajeService(TipoTatuajeRepository tipoTatuajeRepository) {
        this.tipoTatuajeRepository = tipoTatuajeRepository;
    }

    public List<TipoTatuaje> getTiposDeTatuajePorTatuador(Long tatuadorId) {
        return tipoTatuajeRepository.findByTatuadorId(tatuadorId);
    }

    public TipoTatuaje guardarTipoTatuaje(TipoTatuaje tipoTatuaje) {
        return tipoTatuajeRepository.save(tipoTatuaje);
    }
}
