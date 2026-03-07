import {EditUserProfile} from "../validations/auth.validation";
import {Role} from "@/generated/prisma/enums";
import {User} from "@/generated/prisma/client";

export function fromEditUserToUser(editUserProfile: EditUserProfile, id: string): User {
    return{
        id,
        name: editUserProfile.name,
        email: editUserProfile.email,
        phone: editUserProfile.phone,
        password: editUserProfile.password,
        role: editUserProfile.role as Role,
        gender: editUserProfile.gender,
        image: editUserProfile.image,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}