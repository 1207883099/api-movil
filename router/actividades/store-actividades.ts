const cn = require("../../db");

class Store {
  async Obtener_actividades() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdActividad, Codigo, Nombre, IdLabor FROM Actividades WHERE Estado = 'Activo';`
    );
  }
}

export default new Store();
