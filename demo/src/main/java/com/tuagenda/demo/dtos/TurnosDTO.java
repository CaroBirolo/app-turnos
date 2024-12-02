package com.tuagenda.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurnosDTO {
    Long id;
    LocalDateTime fechaDesde;
    LocalDateTime fechaHasta;
    String nombreCompleto;
    String estilo;
    String email;
    String telefono;
}
