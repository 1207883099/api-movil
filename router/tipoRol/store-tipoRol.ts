const cn = require("../../db");

class Store {
  async Obtener_TipoRol() {
    let poll = await cn.connectioMssql();
    return await poll.query(`SELECT IdTipoRol, Nombre FROM TiposRol;`);
  }

  async Obtener_TipoRol_By_Id(IdTipoRol: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT Codigo FROM TiposRol WHERE IdTipoRol = ${IdTipoRol};`
    );
  }
}

export default new Store();
