//referenciar los modulos internos

const jwt = require("jsonwebtoken");

//crear funcion middleware

function autenticacion (req,res,next){

    let jwtToken=req.header("Authorization");

    jwtToken =jwtToken.split(" ")[1];

    //si no existe token

    if(!jwtToken) return res.status(400).send("no existe token para validar");



    //si existe jwt

    try {
        const payload = jwt.verify(jwtToken,"clave");
        req.usuario = payload;
        next();

    } catch (error) {
        res.status(400).send("Token no valido, no tienen autorizacion")

    }

}

//hacemos los exports

module.exports = autenticacion;