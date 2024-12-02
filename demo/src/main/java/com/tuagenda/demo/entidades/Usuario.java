package com.tuagenda.demo.entidades;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    public enum Rol {
        usuario, admin
    }

    private String telefono;

    @Column(columnDefinition = "TEXT")
    private String notasAdicionales;

    @Column(name = "hora_apertura")
    private LocalTime horaApertura;

    @Column(name = "hora_cierre")
    private LocalTime horaCierre;

    @Column(columnDefinition = "TEXT")
    private String templateEmail;
}
