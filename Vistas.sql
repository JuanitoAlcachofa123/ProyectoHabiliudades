CREATE VIEW VistaIntercambios AS
SELECT 
    i.IDIntercambio,
    u1.IDUsuario AS IDUsuarioEmisor,
    u1.NombreUsuario AS NombreUsuarioEmisor,
    u2.IDUsuario AS IDUsuarioReceptor,
    u2.NombreUsuario AS NombreUsuarioReceptor,
    h.NombreHabilidad AS HabilidadEnseñada,
    i.FechaHoraIntercambio,
    c.Puntuacion,
    c.Comentario
FROM Intercambios i
JOIN Usuarios u1 ON i.IDUsuarioEmisor = u1.IDUsuario
JOIN Usuarios u2 ON i.IDUsuarioReceptor = u2.IDUsuario
JOIN CalificacionesComentarios c ON i.IDIntercambio = c.IDIntercambio
JOIN UsuarioHabilidad uh ON i.IDUsuarioEmisor = uh.IDUsuario
JOIN Habilidades h ON uh.IDHabilidad = h.IDHabilidad;

select * from vistaintercambios