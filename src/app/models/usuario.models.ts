export class Usuario {        // por que necesito usarlo fuera de este archivo

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        // tslint:disable-next-line: variable-name
        public _id?: string // id de moongose
    ) { }

}

//  ? opcionales
