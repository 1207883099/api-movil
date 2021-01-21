import { Request, Response, Router } from "express";
import {
  ParteTrabajoDetalleValor_INT,
  ParteTrabajoDetalle_INT,
  ParteTrabajo_INT,
} from "../../interface";
import Respuesta from "../../network/response";
import StoreActividad from "../actividades/store-actividades";
import Store from "./store-parte-trabajo";

class ParteTrabajo {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async create_parte_trabajo(req: Request, res: Response) {
    const { dataPD } = req.body || null;
    console.log(dataPD[0].ParteTrabajoDetalle);

    try {
      for (let i = 0; i < dataPD.length; i++) {
        const ParteTrabajo: ParteTrabajo_INT = {
          Codigo: "00000001",
          Division: dataPD[i].Division,
          EjercicioFiscal: dataPD[i].EjercicioFiscal,
          Fecha: dataPD[i].Fecha,
          Hacienda: null,
          IntegradoNovedad: 0,
          IdMayordomo: dataPD[i].IdMayordomo,
          IdPeriodo: dataPD[i].IdPeriodo,
          Sector: null,
          IdTipoRol: dataPD[i].IdTipoRol,
          IdHacienda: dataPD[i].IdHacienda,
          IdSector: dataPD[i].IdSector,
          ParteTrabajoDetalle: dataPD[i].ParteTrabajoDetalle,
        };

        Store.insert_parte_trabajo(ParteTrabajo)
          .then(async () => {
            const ultimoPT = await Store.get_ultimo_parte_trabajo();

            for (let j = 0; j < ParteTrabajo.ParteTrabajoDetalle.length; j++) {
              const actividad = await StoreActividad.Obtener_labor_and_tipo(
                ParteTrabajo.ParteTrabajoDetalle[j].IdActividad
              );

              const ParteTrabajoDetalle: ParteTrabajoDetalle_INT = {
                IdActividad: ParteTrabajo.ParteTrabajoDetalle[j].IdActividad,
                TipoActividad: actividad.recordset[0].TipoActividad,
                IdLabor: actividad.recordset[0].IdLabor,
                Adicional: 0.0,
                CodigoEmpleado:
                  ParteTrabajo.ParteTrabajoDetalle[j].CodigoEmpleado,
                IdEmpleado: ParteTrabajo.ParteTrabajoDetalle[j].IdEmpleado,
                IdNovedad: null,
                IdParteTrabajo: Number(ultimoPT.recordset[0].IdParteTrabajo),
                IdRubro: 111,
                Tarifa: ParteTrabajo.ParteTrabajoDetalle[j].Tarifa,
                Total: ParteTrabajo.ParteTrabajoDetalle[j].Total,
                UnidadMedida: "003",
                Valor: ParteTrabajo.ParteTrabajoDetalle[j].Valor,
                Observacion: null,
                isLote: dataPD[i].ParteTrabajoDetalle[j].isLote,
                lotes: dataPD[i].ParteTrabajoDetalle[j].lotes,
              };

              Store.insert_parte_trabajo_detalle(ParteTrabajoDetalle)
                .then(async () => {
                  if (ParteTrabajoDetalle.isLote) {
                    const ultimoPTD = await Store.get_ultimo_parte_trabajo_detalle();

                    let item;
                    for (let k = 0; k < ParteTrabajoDetalle.lotes.length; k++) {
                      item = ParteTrabajoDetalle.lotes;

                      console.log(item);

                      const ParteTrabajoDetalleValor: ParteTrabajoDetalleValor_INT = {
                        IdParteTrabajoDetalle:
                          ultimoPTD.recordset[0].IdParteTrabajoDetalle,
                        Lote: item[k].Lote,
                        IdLote: item[k].IdLote,
                        Valor: item[k].Valor,
                      };

                      await Store.insert_parte_trabajo_detalle_valor(
                        ParteTrabajoDetalleValor
                      );
                    }
                  }
                })
                .catch((error) => console.log(error.message));
            }
          })
          .catch((error) => console.log(error.message));
      }

      Respuesta.success(req, res, { upload: true }, 200);
    } catch (error) {
      Respuesta.success(
        req,
        res,
        {
          feedback: `Ocurrio un error inesperado.`,
        },
        200
      );
    }
  }

  ruta() {
    this.router.post("/", this.create_parte_trabajo);
  }
}

let PT = new ParteTrabajo();
export default PT.router;
