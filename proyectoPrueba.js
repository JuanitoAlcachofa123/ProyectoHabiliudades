const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jhonalex1238',
    database: 'habilidades'
});

conexion.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Endpoint para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;

    // Obtener el último ID de la tabla Usuarios
    let getLastIdQuery = "SELECT MAX(IDUsuario) AS lastId FROM Usuarios";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            let lastId = result[0].lastId || 0;
            nuevoUsuario.IDUsuario = lastId + 1;

            let insertQuery = 'INSERT INTO Usuarios SET ?';
            conexion.query(insertQuery, nuevoUsuario, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error al crear el usuario' });
                } else {
                    res.json({ mensaje: 'Usuario creado exitosamente' });
                }
            });
        }
    });
});

// Endpoint para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    let sql = 'SELECT * FROM Usuarios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener usuarios' });
        } else {
            res.json(result);
        }
    });
});

// Endpoint para actualizar un usuario por ID
app.put('/usuarios/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const datosActualizados = req.body;

    let sql = 'UPDATE Usuarios SET ? WHERE IDUsuario = ?';
    
    conexion.query(sql, [datosActualizados, idUsuario], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar el usuario' });
        } else {
            res.json({ mensaje: 'Usuario actualizado exitosamente' });
        }
    });
});

// Endpoint para eliminar un usuario por ID
app.delete('/usuarios/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;

    // Antes de eliminar el usuario, también puedes eliminar registros relacionados en otras tablas
    // Por ejemplo, eliminar registros en UsuarioHabilidad, Intercambios, CalificacionesComentarios, etc.
    // Para este ejemplo, vamos a suponer que eliminas solamente el usuario

    let sql = 'DELETE FROM Usuarios WHERE IDUsuario = ?';
    
    conexion.query(sql, [idUsuario], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al eliminar el usuario' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Usuario no encontrado' });
            } else {
                res.json({ mensaje: 'Usuario eliminado exitosamente' });
            }
        }
    });
});

// HABILIDADES

// Endpoint para crear una nueva habilidad

app.post('/habilidades', (req, res) => {
    const nuevaHabilidad = req.body;

    // Obtener el último ID de la tabla Usuarios
    let getLastIdQuery = "SELECT MAX(IDHabilidad) AS lastId FROM Habilidades";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            let lastId = result[0].lastId || 0;
            nuevoUsuario.IDUsuario = lastId + 1;

            let insertQuery = 'INSERT INTO Habilidades SET ?';
            conexion.query(insertQuery, nuevaHabilidad, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error al crear la habilidad' });
                } else {
                    res.json({ mensaje: 'Habilidad creada exitosamente' });
                }
            });
        }
    });
});


// Endpoint para obtener todas las habilidades
app.get('/habilidades', (req, res) => {
    let sql = 'SELECT * FROM Habilidades';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener las habilidades' });
        } else {
            res.json(result);
        }
    });
});

// Endpoint para eliminar una habilidad por ID
app.delete('/habilidades/:idHabilidad', (req, res) => {
    const idHabilidad = req.params.idHabilidad;

    let sql = 'DELETE FROM Habilidades WHERE IDHabilidad = ?';
    
    conexion.query(sql, [idHabilidad], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al eliminar la habilidad' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Habilidad no encontrada' });
            } else {
                res.json({ mensaje: 'Habilidad eliminada exitosamente' });
            }
        }
    });
});

// Endpoint para actualizar una habilidad por ID
app.put('/habilidades/:idHabilidad', (req, res) => {
    const idHabilidad = req.params.idHabilidad;
    const datosActualizados = req.body;

    let sql = 'UPDATE Habilidades SET ? WHERE IDHabilidad = ?';
    
    conexion.query(sql, [datosActualizados, idHabilidad], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar la habilidad' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Habilidad no encontrada' });
            } else {
                res.json({ mensaje: 'Habilidad actualizada exitosamente' });
            }
        }
    });
});

// USUARIOHABILIDAD

// Endpoint para crear una nueva relación UsuarioHabilidad
app.post('/usuarioHabilidad', (req, res) => {
    const nuevaRelacion = req.body;

    let sql = 'INSERT INTO UsuarioHabilidad SET ?';
    
    conexion.query(sql, nuevaRelacion, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al crear la relación UsuarioHabilidad' });
        } else {
            res.json({ mensaje: 'Relación UsuarioHabilidad creada exitosamente' });
        }
    });
});

// Endpoint para obtener todas las relaciones UsuarioHabilidad
app.get('/usuarioHabilidad', (req, res) => {
    let sql = 'SELECT * FROM UsuarioHabilidad';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener las relaciones UsuarioHabilidad' });
        } else {
            res.json(result);
        }
    });
});

// Endpoint para actualizar la descripción de una relación UsuarioHabilidad por IDUsuario e IDHabilidad
app.put('/usuarioHabilidad/:idUsuario/:idHabilidad', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const idHabilidad = req.params.idHabilidad;
    const nuevaDescripcion = req.body.descripcionUsuarioHabilidad;

    let sql = 'UPDATE UsuarioHabilidad SET descripcionUsuarioHabilidad = ? WHERE IDUsuario = ? AND IDHabilidad = ?';
    
    conexion.query(sql, [nuevaDescripcion, idUsuario, idHabilidad], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar la descripción de la relación UsuarioHabilidad' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Relación UsuarioHabilidad no encontrada' });
            } else {
                res.json({ mensaje: 'Descripción de la relación UsuarioHabilidad actualizada exitosamente' });
            }
        }
    });
});

// Endpoint para eliminar una relación UsuarioHabilidad por IDUsuario e IDHabilidad
app.delete('/usuarioHabilidad/:idUsuario/:idHabilidad', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const idHabilidad = req.params.idHabilidad;

    let sql = 'DELETE FROM UsuarioHabilidad WHERE IDUsuario = ? AND IDHabilidad = ?';
    
    conexion.query(sql, [idUsuario, idHabilidad], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al eliminar la relación UsuarioHabilidad' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Relación UsuarioHabilidad no encontrada' });
            } else {
                res.json({ mensaje: 'Relación UsuarioHabilidad eliminada exitosamente' });
            }
        }
    });
});

//INTERCAMBIOS

// Endpoint para crear un nuevo intercambio
app.post('/intercambios', (req, res) => {
    const nuevoIntercambio = req.body;

    let sql = 'INSERT INTO Intercambios SET ?';
    
    conexion.query(sql, nuevoIntercambio, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al crear el intercambio' });
        } else {
            res.json({ mensaje: 'Intercambio creado exitosamente' });
        }
    });
});

// Endpoint para obtener todos los intercambios
app.get('/intercambios', (req, res) => {
    let sql = 'SELECT * FROM Intercambios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los intercambios' });
        } else {
            res.json(result);
        }
    });
});

// Endpoint para eliminar un intercambio por ID
app.delete('/intercambios/:idIntercambio', (req, res) => {
    const idIntercambio = req.params.idIntercambio;

    let sql = 'DELETE FROM Intercambios WHERE IDIntercambio = ?';
    
    conexion.query(sql, [idIntercambio], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al eliminar el intercambio' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Intercambio no encontrado' });
            } else {
                res.json({ mensaje: 'Intercambio eliminado exitosamente' });
            }
        }
    });
});

// Endpoint para actualizar un intercambio por ID
app.put('/intercambios/:idIntercambio', (req, res) => {
    const idIntercambio = req.params.idIntercambio;
    const datosActualizados = req.body;

    let sql = 'UPDATE Intercambios SET ? WHERE IDIntercambio = ?';
    
    conexion.query(sql, [datosActualizados, idIntercambio], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar el intercambio' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Intercambio no encontrado' });
            } else {
                res.json({ mensaje: 'Intercambio actualizado exitosamente' });
            }
        }
    });
});

//CALIFICACIONES

// Endpoint para crear una nueva calificación y comentario
app.post('/calificaciones', (req, res) => {
    const nuevaCalificacionComentario = req.body;

    let sql = 'INSERT INTO CalificacionesComentarios SET ?';
    
    conexion.query(sql, nuevaCalificacionComentario, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al crear la calificación y comentario' });
        } else {
            res.json({ mensaje: 'Calificación y comentario creados exitosamente' });
        }
    });
});

// Endpoint para obtener todas las calificaciones y comentarios
app.get('/calificaciones', (req, res) => {
    let sql = 'SELECT * FROM CalificacionesComentarios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener las calificaciones y comentarios' });
        } else {
            res.json(result);
        }
    });
});

// Endpoint para eliminar una calificación y comentario por ID
app.delete('/calificaciones/:idCalificacion', (req, res) => {
    const idCalificacion = req.params.idCalificacion;

    let sql = 'DELETE FROM CalificacionesComentarios WHERE IDCalificacion = ?';
    
    conexion.query(sql, [idCalificacion], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al eliminar la calificación y comentario' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Calificación y comentario no encontrados' });
            } else {
                res.json({ mensaje: 'Calificación y comentario eliminados exitosamente' });
            }
        }
    });
});

// Endpoint para actualizar una calificación y comentario por ID
app.put('/calificaciones/:idCalificacion', (req, res) => {
    const idCalificacion = req.params.idCalificacion;
    const datosActualizados = req.body;

    let sql = 'UPDATE CalificacionesComentarios SET ? WHERE IDCalificacion = ?';
    
    conexion.query(sql, [datosActualizados, idCalificacion], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al actualizar la calificación y comentario' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Calificación y comentario no encontrados' });
            } else {
                res.json({ mensaje: 'Calificación y comentario actualizados exitosamente' });
            }
        }
    });
});

//VISTAS:

// Endpoint para obtener los datos de la vista VistaIntercambios
app.get('/vista', (req, res) => {
    let sql = 'SELECT * FROM VistaIntercambios';
    
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error al obtener los datos de la vista VistaIntercambios' });
        } else {
            res.json(result);
        }
    });
});



app.listen(3000, () => {
    console.log('Servidor OK en puerto 3000');
});