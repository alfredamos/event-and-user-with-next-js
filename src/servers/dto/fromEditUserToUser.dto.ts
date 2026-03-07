import {EditUserProfile} from "../validations/auth.validation";
import {Role} from "@/generated/prisma/enums";

export function fromEditUserToUser(editUserProfile: EditUserProfile, id: string) {
    return{
        id,
        name: editUserProfile.name,
        email: editUserProfile.email,
        phone: editUserProfile.phone,
        password: editUserProfile.password,
        role: Role.User,
        gender: editUserProfile.gender,
        image: editUserProfile.image,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}