const express = require("express");
const path = require("path");
const app = express();
let mysql = require("mysql");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "public")));
//Añadir si se va a usar el método POST
app.use(express.json());
app.use(cors());

//----------------------------- Funciones -----------------------------
function conectar() {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'zxASqw!"',
    database: "proyecto",
  });

  //Conectarse a la base de datos

  connection.connect(function (err) {
    if (err) {
      return console.error("error:" + err.message);
    }
    //console.log("Conectado a la base de datos");
  });
  return connection;
}

function desconectar(connection) {
  connection.end(function (err) {
    if (err) {
      return console.error("error:" + err.message);
    }
    //console.log("Desconectado");
  });
}

//----------------------------- Consultas -----------------------------

//----------------------------- Consultas de usuarios -----------------------------

//Obtener todos los usuarios
app.get("/users", function (req, res) {
  let connection = conectar();

  connection.query("select * from usuarios", function (err, results) {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

//Insertar usuarios
app.post("/insertuser", function (req, res) {
  let connection = conectar();

  console.log(req.body);
  let nombre = req.body.nombre;
  let apellidos = req.body.apellidos;
  let email = req.body.email;
  let password = req.body.password;

  connection.query(
    "insert into usuarios(nombre,apellidos,email,password) values(?,?,?,?)",
    [nombre, apellidos, email, password],
    function (err, results) {
      if (err) {
        res.send("Error:" + err.message);
      } else {
        res.send("Usuario insertado!");
      }
    }
  );
});

//Actualizar usuarios
app.post("/updateuser", function (req, res) {
  let connection = conectar();

  let id_usuario = req.body.id_usuario;
  let nombre = req.body.nombre;
  let apellidos = req.body.apellidos;
  let password = req.body.password;

  connection.query(
    "update usuarios set nombre = ?,apellidos=?,password=? where id_usuario = ?",
    [nombre, apellidos, password, id_usuario],
    function (err) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        res.send("Usuario actualizado correctamente");
      }
    }
  );
  //Cerrar la conexión
});

//----------------------------- Consultas de sociedades -----------------------------

//Seleccionar todas las sociedades por id de la sociedad que ha iniciado sesión
app.post("/selectsocieties", function (req, res) {
  let connection = conectar();
  let id_usuario = req.body.id_usuario;

  connection.query(
    "select * from sociedades where id_usuario = ?",
    [id_usuario],
    function (err, results) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        res.send(results);
      }
    }
  );
  //Cerrar la conexión
});

//Seleccionar todas las sociedades por id del usuario que ha iniciado sesión
app.post("/selectsociety", function (req, res) {
  let connection = conectar();
  let id_sociedad = req.body.id_sociedad;

  connection.query(
    "select * from sociedades where id_sociedad = ?",
    [id_sociedad],
    function (err, results) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
  //Cerrar la conexión
});

//Insertar sociedades
app.post("/insertsociety", function (req, res) {
  let connection = conectar();

  let nombre = req.body.nombre_sociedad;
  let direccion = req.body.direccion_sociedad;
  let email = req.body.email_sociedad;
  let telefono = req.body.telefono_sociedad;
  let icono = req.body.icono_empresa;

  icono = icono.split("\\");
  let iconoFull = "http://localhost:8080/images/" + icono[2];
  let id_usuario = req.body.id_usuario;

  connection.query(
    "insert into sociedades(nombre_sociedad,telefono_sociedad,email_sociedad,direccion_sociedad,logo,id_usuario) values(?,?,?,?,?,?)",
    [nombre, telefono, email, direccion, iconoFull, id_usuario],
    function (err, results) {
      if (err) {
        res.send("Error:" + err.message);
      } else {
        res.send("Sociedad insertada!");
      }
    }
  );
});

app.listen(8080);
