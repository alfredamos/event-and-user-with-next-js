import {SignupUser} from "../validations/auth.validation";
import {Prisma} from "../generated/prisma/client";
import {Role} from "../generated/prisma/enums";

export function fromSignupUserToUser(signupUser: SignupUser): Prisma.UserCreateInput{
    return{
        name: signupUser.name,
        email: signupUser.email,
        phone: signupUser.phone,
        password: signupUser.password,
        role: Role.User,
        gender: signupUser.gender,
        image: signupUser.image,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}