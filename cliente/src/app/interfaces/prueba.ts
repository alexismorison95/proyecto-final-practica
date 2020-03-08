export interface PruebasInterface {

    id?: number;
    fecha: string;
    hora: string;
    nromuestra: number;
    resultado: number;
    nroacta?: number;
    nroretencion?: number;
    verificado?: boolean;
    rechazado?: boolean;
    descripcionrechazo?: boolean;
    dniconductor: number;
    iddominio: string;
    idprestamo: number;

}