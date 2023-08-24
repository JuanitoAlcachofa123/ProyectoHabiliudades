CREATE DATABASE Habilidades;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    IDUsuario INT PRIMARY KEY,
    NombreUsuario VARCHAR(50),
    Contraseña VARCHAR(8),
    CorreoElectronico VARCHAR(30)
);

-- Tabla Habilidades
CREATE TABLE Habilidades (
    IDHabilidad INT PRIMARY KEY,
    NombreHabilidad VARCHAR(100),
    DescripcionHabilidad VARCHAR(100)
);

-- Tabla UsuarioHabilidad (relación N a M)
CREATE TABLE UsuarioHabilidad (
    IDUsuario INT,
    IDHabilidad INT,
    PRIMARY KEY (IDUsuario, IDHabilidad),
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario),
    FOREIGN KEY (IDHabilidad) REFERENCES Habilidades(IDHabilidad)
);

-- Tabla Intercambios
CREATE TABLE Intercambios (
    IDIntercambio INT PRIMARY KEY,
    IDUsuarioEmisor INT,
    IDUsuarioReceptor INT,
    FechaHoraIntercambio DATETIME,
    EstadoIntercambio VARCHAR(50),
    FOREIGN KEY (IDUsuarioEmisor) REFERENCES Usuarios(IDUsuario),
    FOREIGN KEY (IDUsuarioReceptor) REFERENCES Usuarios(IDUsuario)
);

-- Tabla CalificacionesComentarios
CREATE TABLE CalificacionesComentarios (
    IDCalificacion INT PRIMARY KEY,
    IDIntercambio INT,
    IDUsuarioCalificador INT,
    IDUsuarioCalificado INT,
    Puntuacion INT,
    Comentario VARCHAR(100),
    FOREIGN KEY (IDIntercambio) REFERENCES Intercambios(IDIntercambio),
    FOREIGN KEY (IDUsuarioCalificador) REFERENCES Usuarios(IDUsuario),
    FOREIGN KEY (IDUsuarioCalificado) REFERENCES Usuarios(IDUsuario)
);