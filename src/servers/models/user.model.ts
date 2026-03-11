import {Gender} from "@/generated/prisma/enums";

export class UserModel {
    email: string ="";
    password?: string = "";
    name: string = "";
    phone: string = ""
    image: string = ""
    gender: Gender = Gender.Male;
}