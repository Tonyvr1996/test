"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Op = require("sequelize").Op;
const util_1 = __importDefault(require("./../util"));
const usuarios = require("./../../models").usersistems;
class UsuariosController {
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (req.body.cedula === undefined || req.body.nombre === undefined || req.body.apellido === undefined) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
            if (token == null) {
                res
                    .status(400)
                    .json({
                    log: "La informacion enviada no es valida, el token de autenticacion no fue enviado"
                });
                return;
            }
            let tokenjson = util_1.default.validarToken(token);
            if (!tokenjson.valido) {
                res
                    .status(401)
                    .json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            usuarios.create({
                cedula: req.body.cedula,
                pasword: req.body.pasword,
                nombreUser: req.body.nombreuser,
                apellidoUser: req.body.apellidoUser,
                email: req.body.email,
                phone: req.body.phone,
                createdAt: new Date(),
                updatedAt: null
            }).then((rs) => {
                console.log(rs);
                res.status(200).json(rs);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
}
exports.default = new UsuariosController();
