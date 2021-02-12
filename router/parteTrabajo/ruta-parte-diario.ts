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
    let lasIdParteTrabajoDetalle: number;

    try {
      ///// INSERTAR PARTE DIARIOS
      for (let i = 0; i < dataPD.length; i++) {
        const ParteTrabajo: ParteTrabajo_INT = {
          Codigo: "00000004",
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

        ///// VALIDAR PARTE DIARIO REPETIDO
        const ExistPTD = await Store.get_parte_trabajo(
          dataPD[i].Fecha,
          dataPD[i].IdMayordomo,
          dataPD[i].IdPeriodo,
          dataPD[i].IdTipoRol,
          dataPD[i].IdHacienda,
          dataPD[i].IdSector
        );
        const DataExist: ParteTrabajo_INT[] = ExistPTD.recordset;

        if (DataExist.length) {
          Store.get_parte_trabajo_detalle_by_parte_trabajo(
            Number(DataExist[0].IdParteTrabajo)
          ).then((response) => {
            const PTD: ParteTrabajoDetalle_INT[] = response.recordset;

            for (let i = 0; i < PTD.length; i++) {
              Store.remove_parte_trabajo_detalle_valor(
                Number(PTD[i].IdParteTrabajoDetalle)
              ).then(() =>
                console.log("Eliminar parte trabajo detalle valor duplicado")
              );
            }

            Store.remove_parte_trabajo_detalle(
              Number(DataExist[0].IdParteTrabajo)
            ).then(() =>
              console.log("Eliminar parte trabajo detalle duplicado")
            );
            Store.remove_parte_trabajo(
              Number(DataExist[0].IdParteTrabajo)
            ).then(() => console.log("Eliminar parte trabajo duplicado"));
          });
        }

        Store.insert_parte_trabajo(ParteTrabajo)
          .then(async () => {
            const ultimoPT = await Store.get_ultimo_parte_trabajo();

            for (let j = 0; j < ParteTrabajo.ParteTrabajoDetalle.length; j++) {
              if (ParteTrabajo.ParteTrabajoDetalle[j]) {
                const actividad = await StoreActividad.Obtener_labor_and_tipo(
                  ParteTrabajo.ParteTrabajoDetalle[j].IdActividad
                );

                const idPT = Number(ultimoPT.recordset[0].IdParteTrabajo);

                const ParteTrabajoDetalle: ParteTrabajoDetalle_INT = {
                  IdActividad: ParteTrabajo.ParteTrabajoDetalle[j].IdActividad,
                  TipoActividad: actividad.recordset[0].TipoActividad,
                  IdLabor: actividad.recordset[0].IdLabor,
                  Adicional: 0.0,
                  CodigoEmpleado:
                    ParteTrabajo.ParteTrabajoDetalle[j].CodigoEmpleado,
                  IdEmpleado: ParteTrabajo.ParteTrabajoDetalle[j].IdEmpleado,
                  IdNovedad: null,
                  IdParteTrabajo: idPT,
                  IdRubro: 111,
                  Tarifa: ParteTrabajo.ParteTrabajoDetalle[j].Tarifa,
                  Total: ParteTrabajo.ParteTrabajoDetalle[j].Total,
                  UnidadMedida: "003",
                  Valor: ParteTrabajo.ParteTrabajoDetalle[j].Valor,
                  Observacion: null,
                  isLote: dataPD[i].ParteTrabajoDetalle[j].isLote,
                  lotes: dataPD[i].ParteTrabajoDetalle[j].lotes,
                };

                await Store.insert_parte_trabajo_detalle(ParteTrabajoDetalle);

                if (ParteTrabajoDetalle.isLote) {
                  Store.get_ultimo_parte_trabajo_detalle(idPT).then(
                    (ultimoPTD) => {
                      let IdParteTrabajoDetalle: number =
                        ultimoPTD.recordset[0].IdParteTrabajoDetalle;

                      if (IdParteTrabajoDetalle === lasIdParteTrabajoDetalle) {
                        IdParteTrabajoDetalle += 1;
                      }

                      console.log(IdParteTrabajoDetalle);

                      let item;
                      for (
                        let k = 0;
                        k < ParteTrabajoDetalle.lotes.length;
                        k++
                      ) {
                        item = ParteTrabajoDetalle.lotes;

                        const ParteTrabajoDetalleValor: ParteTrabajoDetalleValor_INT = {
                          IdParteTrabajoDetalle: IdParteTrabajoDetalle,
                          Lote: item[k].Lote,
                          IdLote: item[k].IdLote,
                          Valor: item[k].Valor,
                        };

                        Store.insert_parte_trabajo_detalle_valor(
                          ParteTrabajoDetalleValor
                        )
                          .then(() => console.log("Inserto detalle valor"))
                          .catch((error) => console.log(error.message));
                      }

                      lasIdParteTrabajoDetalle = IdParteTrabajoDetalle;
                    }
                  );
                }
              }
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
