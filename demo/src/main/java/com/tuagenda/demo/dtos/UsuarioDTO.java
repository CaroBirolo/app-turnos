package com.tuagenda.demo.dtos;

import lombok.Data;
import java.time.LocalTime;

@Data
public class UsuarioDTO {
    String fechaDesde;
    String fechaHasta;
    String emailTemplate;
    String email;
}
