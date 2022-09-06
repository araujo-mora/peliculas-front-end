export interface peliculaDTO {
    titulo: string;
    resumen: string;
    enCines: boolean;
    trailer: string;
    fechaLanzamiento: Date;
    poster: string;
}

export interface crearPeliculaDTO {
    titulo: string;
    resumen: string;
    enCines: boolean;
    trailer: string;
    fechaLanzamiento: Date;
    poster: File;
}