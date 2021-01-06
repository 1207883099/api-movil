const cn = require("../../db");

class Store {
  async Obtener_TipoRol() {
    let poll = await cn.connectioMssql();
    return await poll.query(`SELECT IdTipoRol, Nombre FROM TiposRol;`);
  }
}

export default new Store();
