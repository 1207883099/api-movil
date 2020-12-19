const cn = require("../../db");

class Store {
  async Obtener_cargos() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdCargo, Codigo, Nombre FROM Cargos WHERE IdEmpresa = 2;`
    );
  }
}

export default new Store();
