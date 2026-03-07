import {NextRequest, NextResponse} from "next/server";
import {eventService} from "@/servers/services/event.service";
import {StatusCodes} from "http-status-codes";
import {HttpError} from "http-errors";
import {Event} from "@/generated/prisma/client";

type params = {
    params: Promise<{id: string}>
}

export async function DELETE(_request: NextRequest, {params}: params) {
    //----> Delete an event with id.
    try {
        const id = (await params).id;
        const response = await eventService.deleteEventById(id);
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error){
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}

export async function GET(_request: NextRequest, {params}: params) {
    //----> Fetch an event with id.
    try {
        const id = (await params).id;
        const response = await eventService.getEventById(id);
        return NextResponse.json(response)
    }catch (error){
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }

}

export async function PATCH(request: NextRequest, {params}: params) {
    //----> Create a new event.
    try {
        const id = (await params).id;
        const body = await request.json() as Event;
        const response = await eventService.editEventById(id, body);
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (error) {
        const httpError = error as HttpError;
        return NextResponse.json(httpError.message, {status: (httpError.statusCode) as number});
    }
}


