import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import expressPinoLogger from "express-pino-logger";

const { credenciales } = require("./config/index");
import { logger } from "./util/loguer";

import Empleados from "./router/empleados/ruta-empleados";
import Validate from "./router/validate/ruta-validate";
import Auth from "./router/auth/ruta-auth";
import Maestra from "./router/maestra/ruta-maestra";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", credenciales.port);
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(expressPinoLogger({ logger: logger }));
    this.app.use(bodyParser.json());
    this.app.use("/static", express.static("public"));
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    // peticiones de datos con api rest
    this.app.use("/api/empleados", Empleados);
    this.app.use("/api/validation", Validate);
    this.app.use("/api/auth", Auth);
    this.app.use("/api/maestra", Maestra);
    /*this.app.use("/api/producto", Producto);
    this.app.use("/api/prestamo", Prestamo);*/
  }

  start() {
    this.app.listen(this.app.get("port"), () =>
      console.log(`RUN SERVER NODE, IN PORT: ${credenciales.port}`)
    );
  }
}

const server = new Server();
server.start();
