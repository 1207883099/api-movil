import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "./store-cargo";
import { Cargo_INT } from "../../interface";

class Cargos {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async getCargos(req: Request, res: Response) {
    try {
      const cargos = await Store.Obtener_cargos();
      const Data_Cargos: Array<Cargo_INT> = cargos.recordset;

      Respuesta.success(req, res, Data_Cargos, 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en obtener cargos.");
    }
  }

  ruta() {
    /* entry point Cargos */
    this.router.get("/", this.getCargos);
  }
}

let cargo = new Cargos();
export default cargo.router;
