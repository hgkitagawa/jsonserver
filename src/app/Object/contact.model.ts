export class IContact{
    id:number;
    name:string;
    email:string;
    contact:string;
    edit:boolean;

    constructor(
        id:number,
        name:string,
        email:string,
        contact:string)
        {
            this.id = id;
            this.name = name;
            this.email = email;
            this.contact = contact;
            this.edit = false;
        }
}