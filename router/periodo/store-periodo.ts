const cn = require("../../db");

class Store {
  async Obtener_Periodo(EjercicioFiscal: number, IdTipoRol: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdPeriodoNomina, EjercicioFiscal, Numero FROM PeriodosNomina WHERE EjercicioFiscal = ${EjercicioFiscal} AND IdTipoRol = ${IdTipoRol};`
    );
  }
}

export default new Store();
