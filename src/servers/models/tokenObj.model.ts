import {TokenType} from "../generated/prisma/enums";

export class TokenObj {
    id: string = "";
    accessToken: string = "";
    expired: boolean = false;
    revoked: boolean = false;
    refreshToken: string = "";
    tokenType: TokenType = TokenType.Bearer;
    userId: string = "";
}