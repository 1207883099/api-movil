export interface Auth_INT {
  id_login_movil: number;
  movil_ip: string;
  id_Empleado: string;
  fecha_ingreso: string;
}

export interface Token_INT {
  movil_ip: string;
  id_login_movil: number;
  id_Empleado: string | number;
}

export interface MyUser {
  token: string;
  movil_ip: string;
  id_login_movil: number;
  id_Empleado: string | number;
  fecha_ingreso: string;
}
