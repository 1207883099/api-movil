import { Request, Response, Router } from "express";
import Respuesta from "../../network/response";
import Store from "./store-auth";
import jwt from "jsonwebtoken";
import StoreEmpleado from "../empleados/store-empleados";
import { Auth_INT, Empleado_INT, MyUser, Token_INT } from "../../interface";
const { credenciales } = require("../../config");

class Auth {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async autenticacion(req: Request, res: Response) {
    const { ip_movil } = req.body || null;

    try {
      const response = await Store.AuthIpMovil(ip_movil);
      const data: Array<Auth_INT> = response.recordset;

      if (data.length === 0) {
        Respuesta.success(
          req,
          res,
          {
            feedback: `La ip: ${ip_movil} no tiene permisos de utilizar la aplicacion.`,
          },
          200
        );
      } else {
        const Empleado = await StoreEmpleado.ConsultaEmpleado(
          data[0].id_Empleado
        );
        const DataEmpleado: Array<Empleado_INT> = Empleado.recordset;

        console.log(DataEmpleado);

        const GenerateToken: Token_INT = {
          id_Empleado: data[0].id_Empleado,
          id_login_movil: data[0].id_login_movil,
          movil_ip: data[0].movil_ip,
          IdMayordomo: DataEmpleado[0].IdEmpleado,
        };

        const MyUser: MyUser = {
          token: jwt.sign(GenerateToken, credenciales.jwtSecret),
          id_Empleado: data[0].id_Empleado,
          id_login_movil: data[0].id_login_movil,
          movil_ip: data[0].movil_ip,
          fecha_ingreso: data[0].fecha_ingreso,
          Nombre: DataEmpleado[0].Nombre,
          Apellido: DataEmpleado[0].Apellido,
          IdMayordomo: DataEmpleado[0].IdEmpleado,
        };

        Respuesta.success(req, res, { MyUser }, 200);
      }
    } catch (error) {
      Respuesta.error(req, res, error, 500, "Error en autenticar usuario");
    }
  }

  ruta() {
    /* entry point auth */
    this.router.post("/", this.autenticacion);
  }
}

let auth = new Auth();
export default auth.router;
