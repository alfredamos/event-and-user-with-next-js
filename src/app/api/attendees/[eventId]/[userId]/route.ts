import {attendeeService} from "@/servers/services/attendee.service";
import {Attendee} from "@/generated/prisma/client";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";
import {NextRequest, NextResponse} from "next/server";

type params = { params: Promise<{ eventId: string, userId: string }>}

export async function DELETE(_request: NextRequest, { params }: params) {
    //----> Edit attendee with eventId and userId
    try {
        const eventId = (await params).eventId;
        const userId = (await params).userId;
        const response = await attendeeService.deleteAttendeeById(eventId, userId);
        return Response.json(response, { status: StatusCodes.OK });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}

export async function GET(_request: NextRequest, {params}: params) {
    //----> Fetch attendee with eventId and userId
    try {
        const eventId = (await params).eventId;
        const userId = (await params).userId;
        const response = await attendeeService.getAttendeeById(eventId, userId);
        return Response.json(response, { status: StatusCodes.OK });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}

export async function PATCH(request: NextRequest, { params }: params) {
    //----> Edit attendee with eventId and userId
    try {
        const body = await request.json() as Attendee;
        const eventId = (await params).eventId;
        const userId = (await params).userId;
        const response = await attendeeService.editAttendeeById(eventId, userId, body);
        return Response.json(response, { status: StatusCodes.OK });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}