import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "./store-tarifa";
import { Tarifas_INT } from "../../interface";

class Tarifas {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async getTarifaz(req: Request, res: Response) {
    try {
      const tarifa = await Store.Obtener_Tarifas();
      const Data_Tarifas: Array<Tarifas_INT> = tarifa.recordset;

      Respuesta.success(req, res, Data_Tarifas, 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en obtener tarifa.");
    }
  }

  ruta() {
    /* entry point Cargos */
    this.router.get("/", this.getTarifaz);
  }
}

let tarifa = new Tarifas();
export default tarifa.router;
