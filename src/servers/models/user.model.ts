import {Gender, Role} from "@/generated/prisma/enums";

export class UserModel {
    id?: string = "";
    email: string ="";
    password?: string = "";
    role?: Role = Role.User;
    name: string = "";
    phone: string = ""
    image: string = ""
    gender: Gender = Gender.Male;
}