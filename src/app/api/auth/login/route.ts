import {NextRequest, NextResponse} from "next/server";
import {HttpError} from "http-errors";
import {StatusCodes} from "http-status-codes";
import {LoginUser} from "@/servers/validations/auth.validation";
import {authService} from "@/servers/services/auth.service";

export async function POST(request: NextRequest) {
    //----> Login user.
    try {
        const body = await request.json() as LoginUser;
        const response = await authService.loginUser(body);
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}