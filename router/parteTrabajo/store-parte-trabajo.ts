import {
  ParteTrabajo_INT,
  ParteTrabajoDetalle_INT,
  ParteTrabajoDetalleValor_INT,
} from "../../interface";
const cn = require("../../db");

class Store {
  /* PARTE TRABAJO */
  async insert_parte_trabajo(PT: ParteTrabajo_INT) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `INSERT INTO PartesTrabajo (Codigo, Division, EjercicioFiscal, Fecha, Hacienda, IntegradoNovedad, IdMayordomo, IdPeriodo, Sector, IdTipoRol, IdHacienda, IdSector) VALUES ('${PT.Codigo}', '${PT.Division}', '${PT.EjercicioFiscal}', CONVERT(datetime, '${PT.Fecha}'), ${PT.Hacienda}, ${PT.IntegradoNovedad}, ${PT.IdMayordomo}, ${PT.IdPeriodo}, ${PT.Sector}, ${PT.IdTipoRol}, ${PT.IdHacienda}, ${PT.IdSector});`
    );
  }

  async get_ultimo_parte_trabajo() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT TOP 1 [IdParteTrabajo] FROM PartesTrabajo ORDER BY IdParteTrabajo DESC;`
    );
  }

  /* PARTE TRABAJO DETALLE */

  async insert_parte_trabajo_detalle(PTD: ParteTrabajoDetalle_INT) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `INSERT INTO PartesTrabajoDetalle (IdActividad, TipoActividad, IdLabor, Adicional, Codigo, IdEmpleado, IdNovedad, IdParteTrabajo, IdRubro, Tarifa, Total, UnidadMedida, Valor, Observacion) VALUES (${PTD.IdActividad}, '${PTD.TipoActividad}', ${PTD.IdLabor}, ${PTD.Adicional}, '${PTD.CodigoEmpleado}', ${PTD.IdEmpleado}, ${PTD.IdNovedad}, ${PTD.IdParteTrabajo}, ${PTD.IdRubro}, ${PTD.Tarifa}, ${PTD.Total}, '${PTD.UnidadMedida}', ${PTD.Valor}, '${PTD.Observacion}');`
    );
  }

  async get_ultimo_parte_trabajo_detalle(IdParteTrabajo: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT TOP 1 [IdParteTrabajoDetalle] FROM PartesTrabajoDetalle WHERE IdParteTrabajo = ${IdParteTrabajo} ORDER BY IdParteTrabajoDetalle DESC;`
    );
  }

  /* PARTE TRABAJO DETALLES VALORES */

  async insert_parte_trabajo_detalle_valor(PTDV: ParteTrabajoDetalleValor_INT) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `INSERT INTO PartesTrabajoDetalleValor (IdParteTrabajoDetalle, Lote, Valor, IdLote) VALUES (${PTDV.IdParteTrabajoDetalle}, '${PTDV.Lote}', ${PTDV.Valor}, ${PTDV.IdLote});`
    );
  }
}

export default new Store();
