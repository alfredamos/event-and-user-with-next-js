import {Session} from "@/servers/models/session.model";
import {Role} from "@/generated/prisma/enums";

export const emptySession : Session = {
    id: '',
    name: '',
    email: '',
    role: Role.User,
    accessToken: '',
    isAdmin: false,
    isLoggedIn: false,
}