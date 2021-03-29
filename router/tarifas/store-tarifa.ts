const cn = require("../../db");

class Store {
  async Obtener_Tarifas() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdTarifa, Maximo, Minimo, ValorTarifa, IdActividad, IdHacienda, ValidaHectareas, UnidadMedida FROM Tarifas;`
    );
  }
}

export default new Store();
