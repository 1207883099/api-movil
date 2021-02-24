import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import StoreLotes from "../lote/store-lote";
import StoreActividades from "../actividades/store-actividades";
import StoreCuadrilla from "../cuadrilla/store-cuadrilla";
const { comprobar_auth } = require("../../util/util-token");
import {
  Actividades_INT,
  Cuadrilla_INT,
  Lote_INT,
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

      let mis_cuadrillas: Array<any> = [];
      for (let i = 0; i < Data_mi_cuadrilla.length; i++) {
        const detalleCuadrilla = await StoreCuadrilla.detalles_de_mi_cuadrilla(
          Data_mi_cuadrilla[i].IdCuadrilla
        );

        const Mi_Cuadrilla_Mas_Detalles: Mi_Cuadrilla_INT = {
          Nombre: detalleCuadrilla.recordset[i].Nombre_Cuadrilla,
          Estado: detalleCuadrilla.recordset[i].Estado,
          IdCuadrilla: Data_mi_cuadrilla[i].IdCuadrilla,
          secuencialpartediario: Data_mi_cuadrilla[i].secuencialpartediario,
          Empleados: detalleCuadrilla.recordset,
        };

        Mi_Cuadrilla_Mas_Detalles.Empleados.map((empleado) => {
          return delete empleado.Estado && delete empleado.Nombre_Cuadrilla;
        });

        Mi_Cuadrilla_Mas_Detalles.Empleados.map((empleado) => {
          empleado.Nombre = empleado.Nombre.replace(/^\s*|\s*$/g, "");
          empleado.Apellido = empleado.Apellido.replace(/^\s*|\s*$/g, "");
          empleado.Cedula = empleado.Cedula.replace(/^\s*|\s*$/g, "");
          return empleado;
        });

        mis_cuadrillas.push(Mi_Cuadrilla_Mas_Detalles);
      }

      /* TERMINA CUADRILLA */
      /* COMIENZO DE ACTIVIDADES */

      const actividades = await StoreActividades.Obtener_actividades();
      const dataActividades: Array<Actividades_INT> = actividades.recordset;

      /* TERMINA ACTIVIDADES */
      /* COMIENZA LOTES */

      const lotes = await StoreLotes.Obtener_lotes();
      const dataLotes: Array<Lote_INT> = lotes.recordset;

      /* TERMINA LOTES */

      const Maestra: Maestra_INT = {
        My_Cuadrilla: mis_cuadrillas,
        Actividades: dataActividades,
        Lotes: dataLotes,
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
