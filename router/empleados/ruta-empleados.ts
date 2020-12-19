import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "./store-empleados";

class Usuario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async obtener_empleados(req: Request, res: Response) {
    try {
      const response = await Store.ConsultaEmpleados();
      Respuesta.success(req, res, response.recordset, 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en obtener usuarios");
    }
  }

  ruta() {
    /* entry point empleados */
    this.router.get("/", this.obtener_empleados);
  }
}

let user = new Usuario();
export default user.router;
