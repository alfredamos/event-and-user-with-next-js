import {userService} from "@/servers/services/user.service";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

export async function GET() {
    //----> Get all users.
    try {
        const response = await userService.getAllUsers();
        return NextResponse.json(response,{status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}