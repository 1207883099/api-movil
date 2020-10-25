import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import StoreLotes from "../lote/store-lote";
import StoreSecto from "../sector/store-sector";
import StoreLabores from "../Labores/store-labores";
import StoreActividades from "../actividades/store-actividades";
import StoreCuadrilla from "../cuadrilla/store-cuadrilla";
const { comprobar_auth } = require("../../util/util-token");
import {
  Actividades_INT,
  Cuadrilla_INT,
  Labores_INT,
  Lote_INT,
  Maestra_INT,
  Mi_Cuadrilla_INT,
  Sector_INT,
} from "../../interface";

class Maestra {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }
  // res.locals.datos_user.id_Empleado
  // '00002169'
  async bajarMaestra(req: Request, res: Response) {
    try {
      /* COMIENZA CUADRILLA */
      const miCuadrilla = await StoreCuadrilla.Obtener_mi_cuadrilla("252");
      const Data_mi_cuadrilla: Array<Cuadrilla_INT> = miCuadrilla.recordset;

      let mis_cuadrillas: Array<any> = [];
      for (let i = 0; i < Data_mi_cuadrilla.length; i++) {
        const detalleCuadrilla = await StoreCuadrilla.detalles_de_mi_cuadrilla(
          Data_mi_cuadrilla[i].IdCuadrilla
        );

        const Mi_Cuadrilla_Mas_Detalles: Mi_Cuadrilla_INT = {
          Nombre: detalleCuadrilla.recordset[i].Nombre_Cuadrilla,
          Estado: detalleCuadrilla.recordset[i].Estado,
          Empleados: detalleCuadrilla.recordset,
        };

        Mi_Cuadrilla_Mas_Detalles.Empleados.map((empleado) => {
          return delete empleado.Estado && delete empleado.Nombre_Cuadrilla;
        });

        mis_cuadrillas.push(Mi_Cuadrilla_Mas_Detalles);
      }

      /* TERMINA CUADRILLA */
      /* COMIENZA LABORES */

      const labores = await StoreLabores.Obtener_Labores();
      const DataLabores: Array<Labores_INT> = labores.recordset;

      /* TERMINA LABORES */
      /* COMIENZO DE ACTIVIDADES */

      const actividades = await StoreActividades.Obtener_actividades();
      const dataActividades: Array<Actividades_INT> = actividades.recordset;

      /* TERMINA ACTIVIDADES */
      /* COMIENZA LOTES */

      const lotes = await StoreLotes.Obtener_lotes();
      const dataLotes: Array<Lote_INT> = lotes.recordset;

      /* TERMINA LOTES */
      /* COMIENZA SECTORES */

      const sectores = await StoreSecto.Obtener_sectores();
      const dataSectores: Array<Sector_INT> = sectores.recordset;

      /* TERMINA SECTORES */

      const Maestra: Maestra_INT = {
        My_Cuadrilla: mis_cuadrillas,
        Labores: DataLabores,
        Actividades: dataActividades,
        Lotes: dataLotes,
        Sectores: dataSectores,
      };

      Respuesta.success(req, res, Maestra, 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en bajar la maestra.");
    }
  }

  ruta() {
    /* entry point auth */
    this.router.get("/", this.bajarMaestra);
  }
}

let maestra = new Maestra();
export default maestra.router;
