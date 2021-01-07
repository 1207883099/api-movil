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
  My_Cuadrilla: Array<Mi_Cuadrilla_INT>;
  // Labores: Array<Labores_INT>;
  Actividades: Array<Actividades_INT>;
  Lotes: Array<Lote_INT>;
  Sectores: Array<Sector_INT>;
}

export interface Empleado_INT {
  IdEmpleado: number;
  Nombre: string;
  Apellido: string;
  Codigo: string;
  Cargo?: string;
  Cedula?: string | undefined | any;
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

export interface Actividades_INT {
  IdActividad: number;
  Codigo: string;
  Nombre: string;
  IdLabor: number;
}

export interface Lote_INT {
  IdLote: number;
  Codigo: string;
  Nombre: string;
  IdSector: number;
}

export interface Sector_INT {
  IdSector: number;
  Nombre: string;
  IdHacienda: number;
  Nombre_Hacienda: string;
}

export interface Cargo_INT {
  IdCargo: string;
  codigo: string;
  Nombre: string;
}

export interface Tarifas_INT {
  IdTarifa: number;
  Maximo: number;
  Minimo: number;
  ValorTarifa: number;
  IdActividad: number;
  IdHacienda: number;
  ValidaHectareas: number | null;
}

export interface Tipo_Rol_INT {
  IdTipoRol: number;
  Nombre: string;
}

export interface Hacienda_INT {
  IdHacienda: number;
  Nombre: string;
}

export interface Ejercicio_Fiscal_INT {
  IdDetalleCatalogo: number;
  Valor1: number;
  Valor2: number;
}

export interface Periodo_Nominas_INT {
  IdPeriodoNomina: number;
  EjercicioFiscal: number;
  Numero: number;
}

export interface Configuracion_INT {
  TipoRol: Array<Tipo_Rol_INT>;
  Haciendas: Array<Hacienda_INT>;
  Fiscal: Array<Ejercicio_Fiscal_INT>;
  Periodo: Array<Periodo_Nominas_INT>;
}
