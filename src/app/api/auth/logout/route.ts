import {authService} from "@/servers/services/auth.service";
import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

export async function POST(_request:NextRequest) {
    //----> Logout user.
    try {
        const response = await authService.logoutUser();
        return  NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}