import { Empleado_INT } from "../../interface";
const cn = require("../../db");

class Store {
  async ConsultaEmpleados() {
    let poll = await cn.connectioMssql();
    return await poll.query(
      "SELECT TOP 10 * FROM Empleados INNER JOIN TiposEmpleado ON TiposEmpleado.codigo = Empleados.TipoEmpleado WHERE TiposEmpleado.idEmpresa = 1 AND TiposEmpleado.Nombre = 'Administrativos' ORDER BY Empleados.IdEmpleado"
    );
  }

  async ConsultaEmpleado(idEmpleado: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT [idEmpleado], [Codigo], [Nombre], [Apellido], [Cargo] FROM Empleados WHERE idEmpleado = '${idEmpleado}';`
    );
  }
}

export default new Store();
