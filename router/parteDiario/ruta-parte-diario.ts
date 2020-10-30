import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";

class ParteDiario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async subir_parte_diario(req: Request, res: Response) {
    try {
      //const response = await Store.ConsultaEmpleados();
      Respuesta.success(req, res, { upload: true }, 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en obtener usuarios");
    }
  }

  ruta() {
    this.router.post("/", this.subir_parte_diario);
  }
}

let diario = new ParteDiario();
export default diario.router;
