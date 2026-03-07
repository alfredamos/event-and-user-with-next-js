"use server"

import {tokenService} from "@/servers/services/token.service";

export async function deleteAllInvalidTokensAction(){
    //----> Delete all invalid tokens.
    try {
        return await tokenService.deleteAllInvalidTokens();
    }catch (error) {
        throw error
    }
}

export async function deleteInvalidTokensByUserIdAction(userId: string){
    //----> Delete invalid tokens by user id.
    try {
        return await tokenService.deleteInvalidTokensByUserId(userId);
    }catch (error) {
        throw error
    }
}