package com.tuagenda.demo.dtos;

import com.tuagenda.demo.entidades.TipoTatuaje;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class AdminConTatuajesDTO {
    private String nombre;
    private String email;
    private List<TipoTatuaje> tiposDeTatuajes;
}
