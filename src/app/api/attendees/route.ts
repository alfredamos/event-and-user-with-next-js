import {attendeeService} from "@/servers/services/attendee.service";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";
import {NextRequest, NextResponse} from "next/server";
import {AttendeeUncheckedCreateInput} from "@/generated/prisma/models/Attendee";

export async function GET() {
    //----> Get all attendees.
    try {
        const response = await attendeeService.getAllAttendees();
        return Response.json(response, { status: StatusCodes.OK });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}

export async function POST(request: NextRequest) {
    //----> Create a new attendee.
    try {
        const body = await request.json() as AttendeeUncheckedCreateInput;
        const response = await attendeeService.createAttendee(body);
        return Response.json(response, { status: StatusCodes.CREATED });
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}