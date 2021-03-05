import { Request, Response, Router } from "express";
import {
  ParteTrabajoDetalleValor_INT,
  ParteTrabajoDetalle_INT,
  ParteTrabajo_INT,
} from "../../interface";
import Respuesta from "../../network/response";
import StoreActividad from "../actividades/store-actividades";
import StoreCuadrilla from "../cuadrilla/store-cuadrilla";
import StoreLabores from "../Labores/store-labores";
import Store from "./store-parte-trabajo";

class ParteTrabajo {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async create_parte_trabajo(req: Request, res: Response) {
    try {
      const {
        Codigo,
        Division,
        EjercicioFiscal,
        Fecha,
        IdMayordomo,
        IdPeriodo,
        IdTipoRol,
        IdHacienda,
        IdSector,
        IdCuadrilla,
      } = req.body || null;

      console.log(req.body);

      const ParteTrabajo: ParteTrabajo_INT = {
        Codigo,
        Division,
        EjercicioFiscal,
        Fecha,
        Hacienda: null,
        IntegradoNovedad: 0,
        IdMayordomo,
        IdPeriodo,
        Sector: null,
        IdTipoRol,
        IdHacienda,
        IdSector,
        IdCuadrilla,
      };

      await Store.insert_parte_trabajo(ParteTrabajo);
      const ultimoPT = await Store.get_ultimo_parte_trabajo();
      const idPT = Number(ultimoPT.recordset[0].IdParteTrabajo);

      Respuesta.success(req, res, { IdParteTrabajo: idPT }, 200);
    } catch (error) {
      console.log(error.message);
      Respuesta.success(
        req,
        res,
        {
          feedback: error.message,
        },
        200
      );
    }
  }

  async create_parte_trabajo_detalle(req: Request, res: Response) {
    try {
      const {
        Codigo,
        IdCuadrilla,
        IdActividad,
        CodigoEmpleado,
        IdEmpleado,
        IdParteTrabajo,
        Tarifa,
        Total,
        Valor,
      } = req.body || null;
      console.log(req.body);
      const actividad = await StoreActividad.Obtener_labor_and_tipo(
        IdActividad
      );

      const IdLabor = actividad.recordset[0].IdLabor;

      const Rubro = await StoreLabores.Obtener_rubro_by_labor(IdLabor);

      const ParteTrabajoDetalle: ParteTrabajoDetalle_INT = {
        IdActividad,
        TipoActividad: actividad.recordset[0].TipoActividad,
        IdLabor,
        Adicional: 0.0,
        CodigoEmpleado,
        IdEmpleado,
        IdNovedad: null,
        IdParteTrabajo,
        IdRubro: Rubro.recordset[0].IdRubro,
        Tarifa,
        Total,
        UnidadMedida: "003",
        Valor,
        Observacion: "App Movil",
      };

      const NumberSecuencial = Codigo.substr(-5);
      await StoreCuadrilla.Update_secuencial_cuadrilla(
        IdCuadrilla,
        Number(NumberSecuencial)
      );

      await Store.insert_parte_trabajo_detalle(ParteTrabajoDetalle);

      const ultimoPTD = await Store.get_ultimo_parte_trabajo_detalle(
        IdParteTrabajo
      );
      let IdParteTrabajoDetalle: number =
        ultimoPTD.recordset[0].IdParteTrabajoDetalle;

      Respuesta.success(req, res, { IdParteTrabajoDetalle }, 200);
    } catch (error) {
      console.log(error.message);
      Respuesta.success(
        req,
        res,
        {
          feedback: error.message,
        },
        200
      );
    }
  }

  async create_parte_trabajo_detalle_valor(req: Request, res: Response) {
    try {
      const { lotes, IdParteTrabajoDetalle } = req.body || null;

      let lote;
      for (let k = 0; k < lotes.length; k++) {
        lote = lotes[k];

        const ParteTrabajoDetalleValor: ParteTrabajoDetalleValor_INT = {
          IdParteTrabajoDetalle,
          Lote: lote.Lote,
          IdLote: lote.IdLote,
          Valor: lote.Valor,
        };

        await Store.insert_parte_trabajo_detalle_valor(
          ParteTrabajoDetalleValor
        );
        console.log("Inserto detalle valor de: " + IdParteTrabajoDetalle);

        Respuesta.success(req, res, { upload: true }, 200);
      }
    } catch (error) {
      console.log(error.message);
      Respuesta.success(
        req,
        res,
        {
          feedback: error.message,
        },
        200
      );
    }
  }

  ruta() {
    // this.router.post("/", this.create_parte_trabajo);
    this.router.post("/", this.create_parte_trabajo);
    this.router.post("/detalles", this.create_parte_trabajo_detalle);
    this.router.post(
      "/detalles-valor",
      this.create_parte_trabajo_detalle_valor
    );
  }
}

let PT = new ParteTrabajo();
export default PT.router;
