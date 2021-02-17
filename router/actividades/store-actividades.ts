const cn = require("../../db");

class Store {
  async Obtener_actividades() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdActividad, Codigo, Nombre, IdLabor, CodigoActividad FROM Actividades WHERE Estado = 'Activo' ORDER BY Nombre ASC;`
    );
  }

  async Obtener_labor_and_tipo(IdActividad: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdLabor, TipoActividad FROM Actividades WHERE IdActividad = ${IdActividad};`
    );
  }
}

export default new Store();
