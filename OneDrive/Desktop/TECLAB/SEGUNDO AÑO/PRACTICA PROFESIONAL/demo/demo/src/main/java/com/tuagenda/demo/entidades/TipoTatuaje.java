package com.tuagenda.demo.entidades;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TipoTatuaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_tatuador", nullable = false)
    private Usuario tatuador;

    private String estilo;

    private int duracionHoras;
}
