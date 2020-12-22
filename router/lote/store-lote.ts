const cn = require("../../db");

class Store {
  async Obtener_lotes() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdLote, Codigo, Nombre, IdSector FROM Lotes ORDER BY Nombre ASC;`
    );
  }
}

export default new Store();
