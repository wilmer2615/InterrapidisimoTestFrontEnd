export class Student{
    constructor(        
        public name: string,
        public email: string,
        public phone: string,
        public password?: string,
        public id?: number,
    ){}
}