const cn = require("../../db");

class Store {
  async Obtener_lotes() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdLote, Codigo, Nombre, IdSector FROM Lotes;`
    );
  }
}

export default new Store();
