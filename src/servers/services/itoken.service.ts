import {TokenUncheckedCreateInput} from "@/generated/prisma/models/Token";
import {ResponseMessage} from "../utils/responseMessage.util";

export interface ITokenService {
    createToken(newToken: TokenUncheckedCreateInput): Promise<ResponseMessage>;
    deleteAllInvalidTokens(): Promise<ResponseMessage>;
    deleteInvalidTokensByUserId(userId: string): Promise<ResponseMessage>;
    revokeAllValidTokensByUserId(userId: string): Promise<ResponseMessage>;
}