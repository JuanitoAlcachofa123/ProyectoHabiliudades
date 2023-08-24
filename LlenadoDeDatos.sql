-- Insertar datos de ejemplo en la tabla Usuarios
INSERT INTO Usuarios (IDUsuario, NombreUsuario, CorreoElectronico) VALUES
(1, 'Usuario1', 'usuario1@gmail.com'),
(2, 'Usuario2', 'usuario2@gmail.com'),
(3, 'Usuario3', 'usuario3@gmail.com'),
(4, 'Usuario4', 'usuario4@gmail.com'),
(5, 'Usuario5', 'usuario5@gmail.com');

-- Insertar datos de ejemplo en la tabla Habilidades
INSERT INTO Habilidades (IDHabilidad, NombreHabilidad, DescripcionHabilidad) VALUES
(101, 'Diseño Gráfico', 'Creación de diseños atractivos'),
(102, 'Desarrollo Web', 'Creación de sitios web interactivos'),
(103, 'Cocina Creativa', 'Preparación de platos únicos'),
(104, 'Fotografía Avanzada', 'Captura de momentos memorables'),
(105, 'Inglés Avanzado', 'Habilidad en el idioma inglés');

-- Insertar datos de ejemplo en la tabla UsuarioHabilidad
INSERT INTO UsuarioHabilidad (IDUsuario, IDHabilidad) VALUES
(1, 101),
(1, 103),
(2, 102),
(3, 105),
(4, 104);

-- Insertar datos de ejemplo en la tabla Intercambios con fechas reales
INSERT INTO Intercambios (IDIntercambio, IDUsuarioEmisor, IDUsuarioReceptor, FechaHoraIntercambio, EstadoIntercambio) VALUES
(1, 1, 2, '2023-08-10 10:00:00', 'Pendiente'),
(2, 3, 1, '2023-08-11 15:30:00', 'Completado'),
(3, 2, 4, '2023-08-12 09:45:00', 'Pendiente'),
(4, 4, 5, '2023-08-13 12:15:00', 'Completado'),
(5, 5, 3, '2023-08-14 18:00:00', 'Pendiente');

-- Insertar datos de ejemplo en la tabla CalificacionesComentarios
INSERT INTO CalificacionesComentarios (IDCalificacion, IDIntercambio, IDUsuarioCalificador, IDUsuarioCalificado, Puntuacion, Comentario) VALUES
(1, 2, 3, 1, 4, 'Excelente intercambio, aprendí mucho'),
(2, 4, 5, 4, 5, 'Fotografías impresionantes, muy profesional'),
(3, 1, 2, 1, 3, 'Buen inicio, espero continuar intercambiando'),
(4, 3, 1, 3, 4, 'Aprendí nuevas recetas, recomendado'),
(5, 5, 3, 5, 5, 'Gran conversación en inglés, gracias');

select * from habilidades;
select * from calificacionescomentarios;
select * from intercambios;
select * from usuariohabilidad;
select * from usuarios;

UPDATE usuarios SET Contraseña = 'contra5' WHERE IDUsuario = 5;