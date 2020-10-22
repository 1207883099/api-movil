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
  IdMayordomo: number;
}

export interface MyUser {
  token: string;
  movil_ip: string;
  id_login_movil: number;
  id_Empleado: string | number;
  fecha_ingreso: string;
  Nombre: string;
  Apellido: string;
  IdMayordomo: number;
}

export interface Maestra_INT {
  My_Cuadrilla: Mi_Cuadrilla_INT;
  Labores: Array<Labores_INT>;
}

export interface Empleado_INT {
  IdEmpleado: number;
  Nombre: string;
  Apellido: string;
  Codigo: string;
  Cedula?: string;
  // de relaciones empleado - cuadrilla
  Estado?: string;
  Nombre_Cuadrilla?: string;
}

export interface Cuadrilla_INT {
  IdCuadrilla: number;
  Codigo: number;
  Estado: string;
  Nombres: string;
  idMayordomo: number;
}

export interface Mi_Cuadrilla_INT {
  Nombre: string;
  Estado: string;
  Empleados: Array<Empleado_INT>;
}

export interface Labores_INT {
  IdLabor: number;
  IdRubro?: number;
  IdLaborPadre?: number;
  Codigo?: string;
  Nombre: string;
}
