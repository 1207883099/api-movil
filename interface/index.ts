export interface Auth_INT {
  id_login_movil: number;
  codeAccess: string;
  id_Empleado: number;
  fecha_ingreso: string;
}

export interface Token_INT {
  codeAccess: string;
  id_login_movil: number;
  id_Empleado: string | number;
  IdMayordomo: number;
}

export interface MyUser {
  token: string;
  codeAccess: string;
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
  // Sectores: Array<Sector_INT>;
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
  secuencialpartediario: number;
}

export interface Mi_Cuadrilla_INT {
  Nombre: string;
  Estado: string;
  IdCuadrilla: number;
  secuencialpartediario: number;
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
  CodigoActividad: number;
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
  FechaInicial: Date | string;
}

export interface Configuracion_INT {
  TipoRol: Array<Tipo_Rol_INT>;
  Haciendas: Array<Hacienda_INT>;
  Fiscal: Array<Ejercicio_Fiscal_INT>;
  Periodo: Array<Periodo_Nominas_INT>;
}

export interface ParteTrabajo_INT {
  IdParteTrabajo?: number;
  Codigo: string;
  Division: string;
  EjercicioFiscal: string;
  Fecha: string;
  Hacienda: string | null;
  IntegradoNovedad: number;
  IdMayordomo: number;
  IdPeriodo: number;
  Sector: string | null;
  IdTipoRol: number;
  IdHacienda: number;
  IdSector: number;
  IdCuadrilla: number;
  ParteTrabajoDetalle: Array<ParteTrabajoDetalle_INT>;
}

export interface ParteTrabajoDetalle_INT {
  IdParteTrabajoDetalle?: number;
  IdActividad: number;
  TipoActividad: string;
  IdLabor: number;
  Adicional: number;
  CodigoEmpleado: string;
  IdEmpleado: number;
  IdNovedad: number | null;
  IdParteTrabajo: number;
  IdRubro: number;
  Tarifa: number;
  Total: number;
  UnidadMedida: number | string;
  Valor: number;
  Observacion: string | null;
  isLote: boolean;
  lotes: Array<ParteTrabajoDetalleValor_INT>;
}

export interface ParteTrabajoDetalleValor_INT {
  IdParteTrabajoDetalle: number;
  Lote: string;
  Valor: number;
  IdLote: number;
}
