import {Role, Prisma} from "../generated/prisma/client";
import {EditUserProfile} from "../validations/auth.validation";

export function fromEditUserToUser(editUserProfile: EditUserProfile, id: string): Prisma.UserModel {
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