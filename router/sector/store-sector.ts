const cn = require("../../db");

class Store {
  async Obtener_sectores() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT Sectores.IdSector, Sectores.Nombre, Sectores.IdHacienda, Haciendas.Nombre as Nombre_Hacienda FROM Sectores INNER JOIN Haciendas ON Sectores.IdHacienda = Haciendas.IdHacienda ORDER BY Sectores.Nombre ASC;`
    );
  }
}

export default new Store();
