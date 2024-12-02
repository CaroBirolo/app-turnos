package com.tuagenda.demo.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CrearTurnoRequest {
    private String emailCliente;
    private String nombreCliente;
    private String telefono;
    private String notasAdicionales;
    private String emailTatuador;
    private String estiloTatuaje;
    private LocalDateTime fechaYHora;
}
