import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import StoreLabores from "../Labores/store-labores";
import StoreCuadrilla from "../cuadrilla/store-cuadrilla";
const { comprobar_auth } = require("../../util/util-token");
import {
  Cuadrilla_INT,
  Labores_INT,
  Maestra_INT,
  Mi_Cuadrilla_INT,
} from "../../interface";

class Maestra {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async bajarMaestra(req: Request, res: Response) {
    try {
      /* COMIENZA CUADRILLA */
      const miCuadrilla = await StoreCuadrilla.Obtener_mi_cuadrilla(
        res.locals.datos_user.id_Empleado
      );
      const Data_mi_cuadrilla: Array<Cuadrilla_INT> = miCuadrilla.recordset;

      const detalleCuadrilla = await StoreCuadrilla.detalles_de_mi_cuadrilla(
        Data_mi_cuadrilla[0].IdCuadrilla
      );

      const Mi_Cuadrilla_Mas_Detalles: Mi_Cuadrilla_INT = {
        Nombre: detalleCuadrilla.recordset[0].Nombre_Cuadrilla,
        Estado: detalleCuadrilla.recordset[0].Estado,
        Empleados: detalleCuadrilla.recordset,
      };

      Mi_Cuadrilla_Mas_Detalles.Empleados.map((empleado) => {
        return delete empleado.Estado && delete empleado.Nombre_Cuadrilla;
      });

      /* TERMINA CUADRILLA */
      /* COMIENZA LABORES */

      const labores = await StoreLabores.Obtener_Labores();
      const DataLabores: Array<Labores_INT> = labores.recordset;

      /* TERMINA LABORES */

      const Maestra: Maestra_INT = {
        My_Cuadrilla: Mi_Cuadrilla_Mas_Detalles,
        Labores: DataLabores,
      };

      Respuesta.success(req, res, Maestra, 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en bajar la maestra.");
    }
  }

  ruta() {
    /* entry point auth */
    this.router.get("/", comprobar_auth, this.bajarMaestra);
  }
}

let maestra = new Maestra();
export default maestra.router;
