const cn = require("../../db");

class Store {
  async Obtener_Labores() {
    let poll = await cn.connectioMssql();
    return await poll.query(`SELECT IdLabor, Nombre FROM Labores;`);
  }
}

export default new Store();
