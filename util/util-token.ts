import { Request, Response, NextFunction, Router } from "express";
import jwt from "jsonwebtoken";
import Respuesta from "../network/response";
const { credenciales } = require("../config");

const comprobar = Router();

comprobar.use((req: Request, res: Response, next: NextFunction) => {
  const token: String | any = req.headers["access-token"];
  console.log(token);

  if (token) {
    jwt.verify(token, credenciales.jwtSecret, (err: any, decoded: any) => {
      if (err) {
        console.log(err);
        Respuesta.success(
          req,
          res,
          { feedback: "Token inválida o expirada" },
          200
        );
      } else {
        console.log(decoded);
        res.locals.datos_user = decoded;
        next();
      }
    });
  } else {
    Respuesta.success(
      req,
      res,
      { feedback: "Token no proveída o no ingresada" },
      200
    );
  }
});

module.exports = {
  comprobar_auth: comprobar,
};
