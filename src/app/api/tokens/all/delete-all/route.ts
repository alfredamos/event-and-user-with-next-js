import {tokenService} from "@/servers/services/token.service";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";
import {NextResponse} from "next/server";

export async function DELETE() {
    //----> Delete all invalid tokens.
    try {
        const response = await tokenService.deleteAllInvalidTokens();
        return Response.json(response, { status: StatusCodes.OK });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}