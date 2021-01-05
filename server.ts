import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import expressPinoLogger from "express-pino-logger";

const { credenciales } = require("./config/index");
import { logger } from "./util/loguer";

import Empleados from "./router/empleados/ruta-empleados";
import Auth from "./router/auth/ruta-auth";
import Maestra from "./router/maestra/ruta-maestra";
import ParteDiario from "./router/parteDiario/ruta-parte-diario";
import Cargos from "./router/cargo/ruta-cargo";
import Tarifas from "./router/tarifas/ruta-tarifa";

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
    this.app.use("/api/auth", Auth);
    this.app.use("/api/maestra", Maestra);
    this.app.use("/api/parteDiario", ParteDiario);
    this.app.use("/api/cargo", Cargos);
    this.app.use("/api/tarifa", Tarifas);
  }

  start() {
    this.app.listen(this.app.get("port"), () =>
      console.log(`RUN SERVER NODE, IN PORT: ${credenciales.port}`)
    );
  }
}

const server = new Server();
server.start();
