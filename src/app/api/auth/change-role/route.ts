import {NextRequest, NextResponse} from "next/server";
import {authService} from "@/servers/services/auth.service";
import {ChangeUserRole} from "@/servers/validations/auth.validation";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

export async function PATCH(request:NextRequest) {
    //----> Change user role.
    try {
        const body = await request.json() as ChangeUserRole;
        const response = await authService.changeUserRole(body);
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number})
    }
}