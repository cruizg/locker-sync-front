export interface Base {
    uid: string;
    created: string;
    registros: [Registro];
    n_registros?: number;
    n_registros_total?: number;
    nombre: string;
    tipo: string;
    usuario: string;
    estado?: string;

}
export interface Registro {
    number: string;
    operador?: string;

}