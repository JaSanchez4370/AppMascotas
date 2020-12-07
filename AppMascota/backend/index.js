// invocar modulos internos

const express = require("express");
const mongoose = require("mongoose");


//modulos de rutas creados 

const usuario = require ("./route/usuario");

const autenticacion = require("./route/autenticacion");
const tarea = require("./route/mascota");

//App 
const app = express();
app.use(express.json());

//definimos la ruta para el modulo de usuarios 

app.use("/api/usuario",usuario);
app.use("/api/autenticacion",autenticacion);
app.use("/api/mascota",tarea);

//puertos de ejecucion 

const port = process.env.port|| 3000;
app.listen(port, () => console.log ("... se esta ejecutando por el puerto ", port));

//registro en mongo

mongoose.connect("mongodb://localhost/mascotasdb",{
   useNewUrlParser:true,
   useFindAndModify:false,
   useCreateIndex:true,
   useUnifiedTopology:true
}).then(()=>console.log("Conexion con mongo OK ..."))
.catch(()=> console.log("Conexion con mongo OFF  :("));