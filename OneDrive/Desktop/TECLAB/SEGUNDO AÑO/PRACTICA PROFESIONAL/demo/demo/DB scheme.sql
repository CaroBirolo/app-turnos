use turnos;
CREATE TABLE `usuario` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `rol` ENUM('usuario', 'admin') NOT NULL DEFAULT 'usuario',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tipo_tatuaje` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_tatuador` BIGINT NOT NULL,
  `estilo` VARCHAR(255) NOT NULL,
  `duracion_horas` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_tatuador`) REFERENCES `usuario`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `turno` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `id_tatuador` BIGINT NOT NULL,
  `id_cliente` BIGINT NOT NULL,
  `id_tipo_tatuaje` BIGINT NOT NULL,
  `fecha_desde` DATETIME NOT NULL,
  `fecha_hasta` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_tatuador`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_cliente`) REFERENCES `usuario`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_tipo_tatuaje`) REFERENCES `tipo_tatuaje`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

