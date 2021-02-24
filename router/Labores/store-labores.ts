const cn = require("../../db");

class Store {
  async Obtener_rubro_by_labor(idLabor: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdRubro FROM Labores WHERE IdLabor = ${idLabor};`
    );
  }
}

export default new Store();
