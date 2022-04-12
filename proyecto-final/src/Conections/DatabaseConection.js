const express = require("express");
const path = require("path");
const app = express();
let mysql = require("mysql");

app.use(express.static(path.join(__dirname, "public")));
//Añadir si se va a usar el método POST
app.use(express.json());

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
  desconectar(connection);
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
      }
    },
  );
});

app.listen(8080);
