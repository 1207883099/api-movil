import { Empleado_INT } from "../../interface";
const cn = require("../../db");

class Store {
  async ConsultaEmpleadosTipo(tipoRol: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT [IdEmpleado], [Codigo], [Nombre], [Apellido], [Cargo] FROM Empleados WHERE TipoEmpleado = ${tipoRol} AND Estado = 01`
    );
  }

  async ConsultaEmpleado(idEmpleado: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT [IdEmpleado], [Codigo], [Nombre], [Apellido], [Cargo] FROM Empleados WHERE idEmpleado = '${idEmpleado}';`
    );
  }
}

export default new Store();
