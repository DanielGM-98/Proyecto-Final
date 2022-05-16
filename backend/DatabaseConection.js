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
    },
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
    },
  );
  //Cerrar la conexión
  desconectar(connection);
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
    },
  );
  //Cerrar la conexión
  desconectar(connection);
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
        res.send(results);
      }
    },
  );
  desconectar(connection);
});

//Seleccionar sociedad en concreto
app.post("/society", function (req, res) {
  let connection = conectar();
  let id_sociedad = req.body.id_sociedad;

  connection.query(
    "select * from sociedades where id_sociedad = ?",
    [id_sociedad],
    function (err, results) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        res.send(results);
      }
    },
  );
  desconectar(connection);
});

//Insertar sociedades
app.post("/insertsociety", function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  let connection = conectar();

  let nombre = req.body.nombre_sociedad;
  let direccion = req.body.direccion_sociedad;
  let email = req.body.email_sociedad;
  let telefono = Number(req.body.telefono_sociedad);
  let icono = req.body.icono_empresa;
  let codigo_pais = Number(req.body.codigo_pais);

  icono = icono.split("\\");
  let iconoFull = "http://localhost:8080/images/" + icono[2];
  let id_usuario = req.body.id_usuario;

  connection.query(
    "insert into sociedades(nombre_sociedad,telefono_sociedad,email_sociedad,direccion_sociedad,logo,id_usuario,codigo_pais) values(?,?,?,?,?,?,?)",
    [nombre, telefono, email, direccion, iconoFull, id_usuario, codigo_pais],
    function (err, results) {
      if (err) {
        res.send("Error:" + err.message);
      } else {
        res.send("Sociedad insertada!");
      }
    },
  );
  desconectar(connection);
});

//Eliminar una sociedad
app.post("/deletesociety", function (req, res) {
  let connection = conectar();
  let id_sociedad = req.body.id_sociedad;

  connection.query(
    "delete from sociedades where id_sociedad = ?",
    [id_sociedad],
    function (err, results) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        res.send("Sociedad eliminada");
      }
    },
  );
  desconectar(connection);
});

//Actualizar sociedad
app.post("/updatesociety", function (req, res) {
  let connection = conectar();

  let id_sociedad = req.body.id_sociedad;
  let nombre_sociedad = req.body.nombre_sociedad;
  let direccion_sociedad = req.body.direccion_sociedad;
  let codigo_pais = req.body.codigo_pais;
  let telefono_sociedad = req.body.telefono_sociedad;

  connection.query(
    "update sociedades set nombre_sociedad = ?,direccion_sociedad=?,codigo_pais=?,telefono_sociedad=? where id_sociedad = ?",
    [
      nombre_sociedad,
      direccion_sociedad,
      codigo_pais,
      telefono_sociedad,
      id_sociedad,
    ],
    function (err) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        res.send("Sociedad actualizada correctamente");
      }
    },
  );
  //Cerrar la conexión
  desconectar(connection);
});

//----------------------------- Consultas de facturas -----------------------------
//Seleccionar todas las facturas
app.post("/selectinvoices", function (req, res) {
  let connection = conectar();

  let id_sociedad = req.body.id_sociedad;
  connection.query(
    "select * from facturas where id_sociedad=? order by date desc",
    [id_sociedad],
    function (err, results) {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    },
  );
  desconectar(connection);
});

//Seleccionar una factura

app.post("/selectinvoice", function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  );

  let connection = conectar();

  let id_factura = req.body.id_factura;
  connection.query(
    "select * from facturas where id_factura=?",
    [id_factura],
    function (err, results) {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    },
  );
  desconectar(connection);
});

//Insertar factura
app.post("/insertinvoice", function (req, res) {
  let connection = conectar();

  let codigo = req.body.id;
  let nombre_empresa = req.body.nombre_empresa;
  let direccion_empresa = req.body.direccion_empresa;
  let email = req.body.email;
  let codigo_pais = req.body.codigo_pais;
  let telefono_empresa = req.body.telefono_company;
  let logo = req.body.logo;
  let date = req.body.date;
  let nombre_sociedad = req.body.nombre_sociedad;
  let id_sociedad = req.body.id_sociedad;
  let datos = JSON.stringify(req.body.datos);
  let forma_pago = req.body.forma_pago;
  let numero_tarjeta = req.body.numero_tarjeta;

  connection.query(
    "insert into facturas(codigo,nombre_empresa,direccion_empresa,email,codigo_pais,telefono_empresa,date,nombre_sociedad,logo,id_sociedad,datos,forma_pago,numero_tarjeta) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      codigo,
      nombre_empresa,
      direccion_empresa,
      email,
      codigo_pais,
      telefono_empresa,
      date,
      nombre_sociedad,
      logo,
      id_sociedad,
      datos,
      forma_pago,
      numero_tarjeta,
    ],
    function (err, results) {
      if (err) {
        res.send("Error:" + err.message);
      } else {
        res.send("Factura insertada!");
      }
    },
  );
  desconectar(connection);
});

//Subir una factura
app.post("/uploadinvoice", function (req, res) {
  let connection = conectar();
  console.log(req.body);
  let nombre_factura = req.body.factura;
  let id_sociedad = req.body.id_sociedad;

  nombre_factura = nombre_factura.split("\\");
  let nombre_completo = nombre_factura[2];
  let fecha = req.body.fecha;
  let facturaFull = "http://localhost:8080/files/" + nombre_factura[2];

  connection.query(
    "insert into facturas_subidas(nombre_factura, id_sociedad,nombre_completo,fecha) values(?,?,?,?)",
    [facturaFull, id_sociedad, nombre_completo, fecha],
    function (err, results) {
      if (err) {
        res.send("Error:" + err.message);
      } else {
        res.send("Factura insertada!");
      }
    },
  );
  desconectar(connection);
});

//Elimina una factura
app.post("/deleteinvoice", function (req, res) {
  let connection = conectar();
  let id_factura = req.body.id_factura;

  connection.query(
    "delete from facturas where id_factura = ?",
    [id_factura],
    function (err, results) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        res.send("Factura eliminada");
      }
    },
  );
  desconectar(connection);
});

//Mostrar todas las facturas subidas

app.post("/selectuploadedinvoices", function (req, res) {
  let connection = conectar();
  console.log(req.body);
  let id_sociedad = Number(req.body.id_sociedad);
  connection.query(
    "select * from facturas_subidas where id_sociedad=? order by fecha desc",
    [id_sociedad],
    function (err, results) {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    },
  );
  desconectar(connection);
});

//Elimina una factura
app.post("/deleteuploadedinvoice", function (req, res) {
  let connection = conectar();
  let id_factura = req.body.id_facturas_subidas;

  connection.query(
    "delete from facturas_subidas where id_facturas_subidas = ?",
    [id_factura],
    function (err, results) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        res.send("Factura eliminada");
      }
    },
  );
  desconectar(connection);
});

app.listen(8080);
