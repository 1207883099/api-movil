const cn = require("../../db");

class Store {
  async Obtener_mi_cuadrilla(id_mayordomo: string) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT * FROM Cuadrillas WHERE IdMayordomo = '${id_mayordomo}';`
    );
  }

  async detalles_de_mi_cuadrilla(id_cuadrilla: number) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT Empleados.IdEmpleado, Empleados.Codigo, Empleados.Nombre, Empleados.Apellido, Empleados.Cedula, Empleados.Cargo, Cuadrillas.Estado, Cuadrillas.Nombre as Nombre_Cuadrilla FROM CuadrillasDetalle INNER JOIN Empleados ON Empleados.IdEmpleado = CuadrillasDetalle.IdEmpleado INNER JOIN Cuadrillas ON Cuadrillas.IdCuadrilla = CuadrillasDetalle.IdCuadrilla WHERE CuadrillasDetalle.IdCuadrilla = ${id_cuadrilla} ORDER BY Empleados.Apellido ASC;`
    );
  }
}

export default new Store();
