import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import expressPinoLogger from "express-pino-logger";

const { config } = require("./config/index");
import { logger } from "./util/loguer";

import Usuarios from "./router/usuarios/ruta-usuario";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", config.port);
    this.app.use(helmet());
    this.app.use(cors());
    //this.app.use(expressPinoLogger({ logger: logger }));
    this.app.use(bodyParser.json());
    this.app.use("/static", express.static("public"));
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    // peticiones de datos con api rest
    this.app.use("/api", Usuarios);
    /*this.app.use("/api/usuario", Usuarios);
        this.app.use("/api/email", Email);
        this.app.use("/api/login", Login);
        this.app.use("/api/producto", Producto);
        this.app.use("/api/cliente", Cliente);
        this.app.use("/api/factura", Factura);
        this.app.use("/api/venta", Ventas);
        this.app.use("/api/proveedor", Proveedores);
        this.app.use("/api/prestamo", Prestamo);*/
  }

  start() {
    this.app.listen(this.app.get("port"), () =>
      console.log(`RUN SERVER NODE, IN PORT: ${config.port}`)
    );
  }
}

const server = new Server();
server.start();
