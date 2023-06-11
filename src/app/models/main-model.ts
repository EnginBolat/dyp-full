import { AuthModel } from "./auth-model";
import { GroupModel } from "./group-model";

export class MainModel{
    Id?:number;
    userNameSurname?:string;
    userEmail?:string;
    userPassword?:string;
    userAuthority?:AuthModel;
    userGroup?:GroupModel;
}