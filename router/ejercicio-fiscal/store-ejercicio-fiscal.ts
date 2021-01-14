const cn = require("../../db");

class Store {
  async Obtener_Ejercicio_Fiscal() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdDetalleCatalogo, Valor1, Valor2 FROM DetallesCatalogo WHERE IdCatalogo = 9 ORDER BY 1 DESC;`
    );
  }

  async Obtener_Divicion() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT IdDetalleCatalogo, Valor1, Valor2 FROM DetallesCatalogo WHERE IdCatalogo = 8 ORDER BY valor2;`
    );
  }
}

export default new Store();
