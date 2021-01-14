import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "../tipoRol/store-tipoRol";
import StoreFiscal from "../ejercicio-fiscal/store-ejercicio-fiscal";
import StorePeriodo from "../periodo/store-periodo";
import StoreHacienda from "../haciendas/store-haciendas";
import StoreSector from "../sector/store-sector";
import {
  Tipo_Rol_INT,
  Hacienda_INT,
  Ejercicio_Fiscal_INT,
  Periodo_Nominas_INT,
  Sector_INT,
} from "../../interface";

class Configuracion {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async getConfiguracion(req: Request, res: Response) {
    const { section } = req.params || null;
    const { fiscal, rol } = req.query || null;

    try {
      switch (section) {
        case "TipoRol":
          /// obtener tipos de rol
          const tipoRol = await Store.Obtener_TipoRol();
          const Data_Tipo_Rol: Array<Tipo_Rol_INT> = tipoRol.recordset;
          Respuesta.success(req, res, Data_Tipo_Rol, 200);
          break;
        case "Hacienda":
          /// obtener haciendas
          const haciendas = await StoreHacienda.Obtener_Haciendas();
          const Data_Hacienda: Array<Hacienda_INT> = haciendas.recordset;
          Respuesta.success(req, res, Data_Hacienda, 200);
          break;
        case "Sector":
          /// obtener sectores
          const sectores = await StoreSector.Obtener_sectores();
          const Data_Sectores: Array<Sector_INT> = sectores.recordset;
          Respuesta.success(req, res, Data_Sectores, 200);
          break;
        case "EjercicioFiscal":
          /// obtener ejercicio fiscal
          const EjercicioFiscal = await StoreFiscal.Obtener_Ejercicio_Fiscal();
          const Data_Ejercicio_Fiscal: Array<Ejercicio_Fiscal_INT> =
            EjercicioFiscal.recordset;
          Respuesta.success(req, res, Data_Ejercicio_Fiscal, 200);
          break;
        case "PeriodoNomina":
          /// obtener Periodo nominas
          const PeriodoNominas = await StorePeriodo.Obtener_Periodo(
            Number(fiscal),
            Number(rol)
          );
          const Data_Periodo: Array<Periodo_Nominas_INT> =
            PeriodoNominas.recordset;
          Respuesta.success(req, res, Data_Periodo, 200);
          break;
        default:
          Respuesta.success(
            req,
            res,
            {
              feedback: `Esta section no esta configurado en el servidor de la app`,
            },
            200
          );
      }
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en obtener Configuracion.");
    }
  }

  ruta() {
    /* entry point Cargos */
    this.router.get("/:section", this.getConfiguracion);
  }
}

let configuracion = new Configuracion();
export default configuracion.router;
