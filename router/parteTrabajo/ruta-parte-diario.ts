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
    const { dataPD } = req.body || null;
    console.log(dataPD[0].ParteTrabajoDetalle);
    let lasIdParteTrabajoDetalle: number;

    try {
      ///// INSERTAR PARTE DIARIOS
      for (let i = 0; i < dataPD.length; i++) {
        let iteracion = `${dataPD[i].codigo}`;
        const CellCuadrilla = iteracion.substr(0, 4);
        const Int = iteracion.substr(4, iteracion.length - 4);
        let codigoZero;

        switch (iteracion.length) {
          case 5:
            codigoZero = `${CellCuadrilla}0000${Int}`;
            break;
          case 6:
            codigoZero = `${CellCuadrilla}000${Int}`;
            break;
          case 7:
            codigoZero = `${CellCuadrilla}00${Int}`;
          case 8:
            codigoZero = `${CellCuadrilla}0${Int}`;
            break;
          default:
            codigoZero = `${CellCuadrilla}${Int}`;
        }

        const ParteTrabajo: ParteTrabajo_INT = {
          Codigo: `${codigoZero}`,
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
          IdCuadrilla: dataPD[i].IdCuadrilla,
          ParteTrabajoDetalle: dataPD[i].ParteTrabajoDetalle,
        };

        ///// VALIDAR PARTE DIARIO REPETIDO
        const ExistPTD = await Store.get_parte_trabajo(
          dataPD[i].Fecha,
          dataPD[i].IdMayordomo,
          dataPD[i].IdPeriodo,
          dataPD[i].IdTipoRol,
          dataPD[i].IdHacienda,
          dataPD[i].IdSector,
          dataPD[i].IdCuadrilla
        );
        const DataExist: ParteTrabajo_INT[] = ExistPTD.recordset;

        if (DataExist.length) {
          Store.get_parte_trabajo_detalle_by_parte_trabajo(
            Number(DataExist[0].IdParteTrabajo)
          ).then(async (response) => {
            const PTD: ParteTrabajoDetalle_INT[] = response.recordset;

            for (let i = 0; i < PTD.length; i++) {
              await Store.remove_parte_trabajo_detalle_valor(
                Number(PTD[i].IdParteTrabajoDetalle)
              );
              console.log("Eliminar parte trabajo detalle valor duplicado");
            }

            await Store.remove_parte_trabajo_detalle(
              Number(DataExist[0].IdParteTrabajo)
            );
            console.log("Eliminar parte trabajo detalle duplicado");

            await Store.remove_parte_trabajo(
              Number(DataExist[0].IdParteTrabajo)
            );
            console.log("Eliminar parte trabajo duplicado");
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

                const IdLabor = actividad.recordset[0].IdLabor;

                const Rubro = await StoreLabores.Obtener_rubro_by_labor(
                  IdLabor
                );

                const idPT = Number(ultimoPT.recordset[0].IdParteTrabajo);

                const ParteTrabajoDetalle: ParteTrabajoDetalle_INT = {
                  IdActividad: ParteTrabajo.ParteTrabajoDetalle[j].IdActividad,
                  TipoActividad: actividad.recordset[0].TipoActividad,
                  IdLabor,
                  Adicional: 0.0,
                  CodigoEmpleado:
                    ParteTrabajo.ParteTrabajoDetalle[j].CodigoEmpleado,
                  IdEmpleado: ParteTrabajo.ParteTrabajoDetalle[j].IdEmpleado,
                  IdNovedad: null,
                  IdParteTrabajo: idPT,
                  IdRubro: Rubro.recordset[0].IdRubro,
                  Tarifa: ParteTrabajo.ParteTrabajoDetalle[j].Tarifa,
                  Total: ParteTrabajo.ParteTrabajoDetalle[j].Total,
                  UnidadMedida: "003",
                  Valor: ParteTrabajo.ParteTrabajoDetalle[j].Valor,
                  Observacion: null,
                  isLote: dataPD[i].ParteTrabajoDetalle[j].isLote,
                  lotes: dataPD[i].ParteTrabajoDetalle[j].lotes,
                };

                const NumberSecuencial = ParteTrabajo.Codigo.substr(-5);
                await StoreCuadrilla.Update_secuencial_cuadrilla(
                  ParteTrabajo.IdCuadrilla,
                  Number(NumberSecuencial)
                );

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
      console.log(error.message);
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
