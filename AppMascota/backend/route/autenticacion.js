// modulos internos node

const express = require ("express");
const router = express.Router();

//modulos internos

const {Usuario} =require("../model/usuario");

//ruta

router.post("/", async(req,res)=>{

    const usuario= await Usuario.findOne({correo:req.body.correo});

    //si no existe correo

    if(!usuario) return res.status(400).send("Usuario o contrasena invalida");

    if(usuario.pass !== req.body.pass)  return res.status(400).send("Usuario o contrasena invalida");

    //generar un JWT
    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken});
})

//exportar modulos 
module.exports = router;