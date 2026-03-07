import {tokenService} from "@/servers/services/token.service";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";
import {NextRequest, NextResponse} from "next/server";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ userId: string}>}) {
    //----> Delete all invalid tokens.
    try {
        const userId = (await params).userId;
        const response = await tokenService.deleteInvalidTokensByUserId(userId);
        return Response.json(response, { status: StatusCodes.OK });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}