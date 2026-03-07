import {NextRequest, NextResponse} from "next/server";
import {attendeeService} from "@/servers/services/attendee.service";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

type params = { params: Promise<{ eventId: string}>}

export async function GET(_request:NextRequest, { params }: params) {
    //----> Fetch attendees by event id
    try {
        const eventId = (await params).eventId;
        const response = await attendeeService.getAttendeesByEventId(eventId);
        return Response.json(response, { status: StatusCodes.OK });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}