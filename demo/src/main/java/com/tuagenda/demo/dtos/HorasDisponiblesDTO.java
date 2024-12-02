package com.tuagenda.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
public class HorasDisponiblesDTO {
    private LocalDate dia;
    private List<LocalTime> horasDisponibles;
}
