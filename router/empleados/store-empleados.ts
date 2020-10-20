const cn = require("../../db");

class Store {
  async ConsultaEmpleados() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      "SELECT TOP 10 * FROM Empleados INNER JOIN TiposEmpleado ON TiposEmpleado.codigo = Empleados.TipoEmpleado WHERE TiposEmpleado.idEmpresa = 1 AND TiposEmpleado.Nombre = 'Administrativos' ORDER BY Empleados.IdEmpleado"
    );
  }
}

export default new Store();
