import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
const cn = require("../../db");

class Usuario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async obtener_usuarios(req: Request, res: Response) {
    try {
      cn.connectioMssql();
      Respuesta.success(req, res, [{ user: "andres coello" }], 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en obtener usuarios");
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
export default user.router;
