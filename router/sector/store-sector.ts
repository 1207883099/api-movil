const cn = require("../../db");

class Store {
  async Obtener_sectores() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT Sectores.IdSector, Sectores.Nombre, Haciendas.Nombre as Nombre_Hacienda FROM Sectores INNER JOIN Haciendas ON Sectores.IdHacienda = Haciendas.IdHacienda WHERE Sectores.IdHacienda = 5 ORDER BY Sectores.Nombre ASC;`
    );
  }
}

export default new Store();
