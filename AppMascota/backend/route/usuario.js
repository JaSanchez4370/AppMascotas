//definimos modelos internos

const express = require("express");
const router = express.Router();

// invocar nuestros modulos creados 

const {Usuario} = require("../model/usuario");

router.post("/", async(req,res)=>{
    //validar si eñ usuario existe
    let usuario = await Usuario.findOne({correo:req.body.correo});

    //en caso de que el correo exista en la bd

    if(usuario) return res.status(400).send("El usuario ya existe en la base de datos")
    //si el correo no existe 
    usuario=new Usuario({
        nombre : req.body.nombre,
        correo : req.body.correo,
        pass: req.body.pass
    });

    //enviar el usuario a la bd y generar un Json web token

    const result = await usuario.save();
    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken})
});

//exportamos los modulos

module.exports = router