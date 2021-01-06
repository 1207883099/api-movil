const cn = require("../../db");

class Store {
  async Obtener_Ejercicio_Fiscal(EjercicioFiscal: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdPeriodoNomina, EjercicioFiscal, Numero FROM PeriodosNomina WHERE EjercicioFiscal = ${EjercicioFiscal};`
    );
  }
}

export default new Store();
