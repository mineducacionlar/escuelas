export class Escuela {

    constructor(
        public nombre: string,
        public cue?: string,
        public nivel?: string,
        public domicilio?: string,
        public barrio?: string,
        public localidad?: string,
        public streetmap?: string,
        public turno?: string,
        public telefono?: string,
        public categoria?: string,
        public zona?: string,
        public dpto?: string,
        public director?: string,
        public img?: string,
        public lat?: string,
        public long?: string,
        public observaciones?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) { }

}
