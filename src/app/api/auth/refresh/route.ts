import {authService} from "@/servers/services/auth.service";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

export async function POST() {
    //----> Refresh user token.
    try {
        const response = await authService.refreshUserToken();
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}