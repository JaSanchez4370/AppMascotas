//modulos internos
const express = require("express");
const router = express.Router();

const autenticacion = require("../middleware/autenticacion");
const { Usuario } =require("../model/usuario");
const {Mascota} = require("../model/mascota");

router.post("/" , autenticacion , async(req,res)=>{
    //definimos el id del usuario que se valido

    let usuario = await Usuario.findById(req.usuario._id);
    //en caso de que no exista el usuario

    if(!usuario) return res.status(400).send("El usuario no existe en la BD");

    let mascotaR = await Mascota.findOne({idUsuario:req.usuario._id,tipo:req.body.tipo});

    if(mascotaR) return res.status(400).send("La mascota ya se encuentra registrada, intente nuevamente");

    //si el usuario existe insertamos la mascota con su id

    const mascota = new Mascota({
        idUsuario:usuario._id,
        nombre: req.body.nombre,
        tipo:req.body.tipo,
        descripcion:req.body.descripcion
    });


    //enviamos el objeto 
    const result = await mascota.save();
    res.status(200).send(result);
});
module.exports = router;