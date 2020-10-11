"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_1 = __importDefault(require("../../network/response"));
const cn = require("../../db");
class Usuario {
  constructor() {
    this.router = express_1.Router();
    this.ruta();
  }
  obtener_usuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        cn.connectioMssql();
        response_1.default.success(req, res, [{ user: "andres coello" }], 200);
      } catch (error) {
        response_1.default.error(
          req,
          res,
          error,
          500,
          "Error en obtener usuarios"
        );
      }
    });
  }
  ruta() {
    /* entry point user */
    this.router.get("/", this.obtener_usuarios);
    /*this.router.get("/:id", this.obtener_usuario);
        this.router.post("/", this.crear_usuario);
        this.router.put("/:id", comprobar, this.editar_usuario);
        this.router.delete("/:id", comprobar, this.eliminar_usuario);*/
  }
}
let user = new Usuario();
exports.default = user.router;
