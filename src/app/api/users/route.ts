import {userService} from "@/servers/services/user.service";
import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

export async function GET(request: NextRequest, {searchParams}: {searchParams: Promise<{ query?: string }>}) {
    //----> Get all users.
    try {
        const query = (await searchParams).query;
        const response = await userService.getAllUsers(query);
        return NextResponse.json(response,{status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}