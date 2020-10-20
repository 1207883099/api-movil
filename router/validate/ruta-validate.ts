import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";

class Validate {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async validar_api(req: Request, res: Response) {
    try {
      Respuesta.success(req, res, { validate: true }, 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en validar api");
    }
  }

  ruta() {
    /* entry point validate */
    this.router.get("/", this.validar_api);
  }
}

let validate = new Validate();
export default validate.router;
