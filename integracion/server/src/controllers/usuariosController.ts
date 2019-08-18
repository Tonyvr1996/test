import {Request, Response } from "express";
const Op = require("sequelize").Op;
import util from './../util';
const usuarios = require("./../../models").usersistems;

class UsuariosController {

  public async newUser(req: Request,res: Response): Promise<void>{
    let token = req.header("Authorization");
    if (req.body.cedula===undefined||req.body.nombre===undefined||req.body.apellido===undefined) {
      res.status(400).json({ log: "Debe ingresar datos validos" });
      return;
    }    
    if (token == null) {
      res
        .status(400)
        .json({
          log:
            "La informacion enviada no es valida, el token de autenticacion no fue enviado"
        });
      return;
    }
    let tokenjson = util.validarToken(token);
    if (!tokenjson.valido) {
      res
        .status(401)
        .json({ log: "Su token a expirado, vuelva a iniciar sesion" });
      return;
    }

    usuarios.create({
      cedula:req.body.cedula,
      pasword:req.body.pasword,
      nombreUser:req.body.nombreuser,
      apellidoUser:req.body.apellidoUser,
      email:req.body.email,
      phone:req.body.phone,
      createdAt:new Date(),
      updatedAt:null
    }).then((rs:any)=>{console.log(rs)
      res.status(200).json(rs)
      return
    },
    (err: any) => {
      console.log(err);
      res.status(500).json({ log: "Error del servidor" });
      return;
    })
  }
}

export default new UsuariosController();
