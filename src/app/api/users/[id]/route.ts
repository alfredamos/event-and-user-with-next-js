import {NextRequest, NextResponse} from "next/server";
import {userService} from "@/servers/services/user.service";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

type params = { params: Promise<{ id: string }>}

export async function DELETE(_request: NextRequest, { params }: params) {
    //----> Delete user by id
    try {
        const id = (await params).id;
        const response = await userService.deleteUserById(id);
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}

export async function GET(_request: NextRequest, { params }: params) {
    //----> Fetch user by id
    try {
        const id = (await params).id;
        const response = await userService.getUserById(id);
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}