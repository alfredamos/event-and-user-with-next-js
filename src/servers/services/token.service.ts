import {TokenCreateInput, TokenUncheckedCreateInput} from "@/generated/prisma/models";
import {ITokenService} from "@/servers/services/itoken.service";
import {ResponseMessage} from "../utils/responseMessage.util";
import {StatusCodes} from "http-status-codes";
import {validateWithZodSchema} from "@/servers/validations/zodSchema.validation";
import {tokenShema} from "@/servers/validations/token.validation";
import catchError from "http-errors";
import {prisma} from "@/servers/db/prisma";

class TokenService implements ITokenService {
    async createToken(newToken: TokenUncheckedCreateInput): Promise<ResponseMessage> {
        //----> Validate newToken.
        if (!validateWithZodSchema(tokenShema, newToken)){
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid token");
        }

        //----> Create a token in the database
        await prisma.token.create({data: newToken});

        //----> Send email to the user with a token
        return new ResponseMessage("Token created", "success", StatusCodes.OK);
    }
    async deleteAllInvalidTokens(): Promise<ResponseMessage> {
        //----> Delete all invalid tokens
        await prisma.token.deleteMany({where: {expired: true, revoked: true}});

        //----> Send email to the user with a token
        return new ResponseMessage("All invalid tokens deleted", "success", StatusCodes.OK);
    }

    async deleteInvalidTokensByUserId(userId: string): Promise<ResponseMessage> {
        await prisma.token.deleteMany({where: {userId, expired: true, revoked: true}});

        //----> Send email to the user with a token
        return new ResponseMessage("All invalid tokens associated with this user have been deleted", "success", StatusCodes.OK);
    }

    async revokeAllValidTokensByUserId(userId: string): Promise<ResponseMessage> {
        //----> Revoke all valid tokens associated with this user
        await prisma.token.updateMany({where: {userId, expired: false, revoked: false}, data: {expired: true, revoked: true}});

        //----> Send email to the user with a token
        return new ResponseMessage("All valid tokens associated with this user have been revoked", "success", StatusCodes.OK);
    }
}


export const tokenService = new TokenService();