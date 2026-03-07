import {eventService} from "@/servers/services/event.service";
import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";
import {EventCreateInput} from "@/generated/prisma/models/Event";

export async function GET() {
    //----> Get all events.
    try {
        const response = await eventService.getAllEvents();
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}

export async function POST(request: NextRequest) {
    //----> Create a new event.
    try {
        const body = await request.json() as EventCreateInput;
        const response = await eventService.createEvent(body);
        return NextResponse.json(response, {status: StatusCodes.CREATED});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}