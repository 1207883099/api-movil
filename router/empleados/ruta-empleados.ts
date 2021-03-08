import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "./store-empleados";
import StoreRol from "../tipoRol/store-tipoRol";

class Usuario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async obtener_empleados_por_tipo(req: Request, res: Response) {
    const { IdRol } = req.params;

    try {
      const obtenerTipoRol = await StoreRol.Obtener_TipoRol_By_Id(
        Number(IdRol)
      );
      const AllEmpleados = await Store.ConsultaEmpleadosTipo(
        obtenerTipoRol.recordset[0].Codigo
      );

      for (let i = 0; i < AllEmpleados.recordset.length; i++) {
        let item = AllEmpleados.recordset[i];
        item.Nombre = item.Nombre.replace(/^\s*|\s*$/g, "");
        item.Apellido = item.Apellido.replace(/^\s*|\s*$/g, "");
      }

      Respuesta.success(req, res, AllEmpleados.recordset, 200);
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en obtener usuarios");
    }
  }

  ruta() {
    /* entry point empleados */
    this.router.get("/:IdRol", this.obtener_empleados_por_tipo);
  }
}

let user = new Usuario();
export default user.router;
