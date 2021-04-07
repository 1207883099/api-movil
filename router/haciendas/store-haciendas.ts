const cn = require("../../db");

class Store {
  async Obtener_Haciendas() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdHacienda, Nombre, IdEmpresa FROM Haciendas;`
    );
  }
}

export default new Store();
