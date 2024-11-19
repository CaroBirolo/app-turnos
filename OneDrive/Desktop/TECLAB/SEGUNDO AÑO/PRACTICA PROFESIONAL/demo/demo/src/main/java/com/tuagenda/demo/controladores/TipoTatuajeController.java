package com.tuagenda.demo.controladores;

import com.tuagenda.demo.entidades.TipoTatuaje;
import com.tuagenda.demo.servicios.TipoTatuajeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipo-tatuaje")
public class TipoTatuajeController {

    private final TipoTatuajeService tipoTatuajeService;

    public TipoTatuajeController(TipoTatuajeService tipoTatuajeService) {
        this.tipoTatuajeService = tipoTatuajeService;
    }

    @GetMapping("/tatuador/{idTatuador}")
    public ResponseEntity<List<TipoTatuaje>> getTiposDeTatuajePorTatuador(@PathVariable Long idTatuador) {
        List<TipoTatuaje> tipos = tipoTatuajeService.getTiposDeTatuajePorTatuador(idTatuador);
        return ResponseEntity.ok(tipos);
    }

    @PostMapping
    public ResponseEntity<TipoTatuaje> guardarTipoTatuaje(@RequestBody TipoTatuaje tipoTatuaje) {
        TipoTatuaje nuevoTipo = tipoTatuajeService.guardarTipoTatuaje(tipoTatuaje);
        return ResponseEntity.ok(nuevoTipo);
    }
}
