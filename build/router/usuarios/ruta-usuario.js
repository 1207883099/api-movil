"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_1 = __importDefault(require("../../network/response"));
class Usuario {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    obtener_usuarios(req, res) {
        try {
            response_1.default.success(req, res, [{ user: 'andres coello' }], 200);
        }
        catch (error) {
            response_1.default.error(req, res, error, 500, 'Error en obtener usuarios');
        }
    }
    ruta() {
        /* entry point user */
        this.router.get("/", this.obtener_usuarios);
        /*this.router.get("/:id", this.obtener_usuario);
        this.router.post("/", this.crear_usuario);
        this.router.put("/:id", comprobar, this.editar_usuario);
        this.router.delete("/:id", comprobar, this.eliminar_usuario);*/
    }
}
let user = new Usuario();
exports.default = user.router;
