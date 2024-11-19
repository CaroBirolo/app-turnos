package com.tuagenda.demo.repositorios;

import com.tuagenda.demo.entidades.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface TurnosRepository extends JpaRepository<Turno, Long> {

    @Query("SELECT t FROM Turno t WHERE t.tatuador.id = :tatuadorId AND " +
            "t.fechaDesde >= :inicioMes AND t.fechaHasta < :finMes")
    List<Turno> findTurnosByTatuadorAndMes(Long tatuadorId, LocalDateTime inicioMes, LocalDateTime finMes);
}

