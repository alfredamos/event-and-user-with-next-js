import {NextRequest, NextResponse} from "next/server";
import {attendeeService} from "@/servers/services/attendee.service";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";

type params = { params: Promise<{ status: string}>}

export async function GET(_request:NextRequest, { params }: params) {
    //----> Fetch attendees by status.
    try {
        const status = (await params).status;
        const response = await attendeeService.getAttendeesByStatus(status);
        return Response.json(response, { status: StatusCodes.OK });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}