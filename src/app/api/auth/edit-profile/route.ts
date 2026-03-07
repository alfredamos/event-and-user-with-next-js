import {NextRequest, NextResponse} from "next/server";
import {EditUserProfile} from "@/servers/validations/auth.validation";
import {authService} from "@/servers/services/auth.service";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

export async function PATCH(request: NextRequest) {
    //----> Edit user profile.
    try {
        const body = await request.json() as EditUserProfile;
        const response = await authService.editUserProfile(body);
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}