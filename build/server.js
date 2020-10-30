"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const { credenciales } = require("./config/index");
const ruta_empleados_1 = __importDefault(
  require("./router/empleados/ruta-empleados")
);
const ruta_validate_1 = __importDefault(
  require("./router/validate/ruta-validate")
);
const ruta_auth_1 = __importDefault(require("./router/auth/ruta-auth"));
const ruta_maestra_1 = __importDefault(
  require("./router/maestra/ruta-maestra")
);
const ruta_parte_diario_1 = __importDefault(
  require("./router/parteDiario/ruta-parte-diario")
);
class Server {
  constructor() {
    this.app = express_1.default();
    this.config();
    this.routes();
  }
  config() {
    this.app.set("port", credenciales.port);
    this.app.use(helmet_1.default());
    this.app.use(cors_1.default());
    //this.app.use(expressPinoLogger({ logger: logger }));
    this.app.use(body_parser_1.default.json());
    this.app.use("/static", express_1.default.static("public"));
    this.app.use(body_parser_1.default.urlencoded({ extended: false }));
  }
  routes() {
    // peticiones de datos con api rest
    this.app.use("/api/empleados", ruta_empleados_1.default);
    this.app.use("/api/validation", ruta_validate_1.default);
    this.app.use("/api/auth", ruta_auth_1.default);
    this.app.use("/api/maestra", ruta_maestra_1.default);
    this.app.use("/api/parteDiario", ruta_parte_diario_1.default);
    /*this.app.use("/api/prestamo", Prestamo);*/
  }
  start() {
    this.app.listen(this.app.get("port"), () =>
      console.log(`RUN SERVER NODE, IN PORT: ${credenciales.port}`)
    );
  }
}
const server = new Server();
server.start();
