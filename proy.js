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

//VISTAS:
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