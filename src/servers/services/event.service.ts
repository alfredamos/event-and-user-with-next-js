import { EventCreateInput } from "@/generated/prisma/models";
import {Event} from "@/generated/prisma/client";
import {IEventService} from "@/servers/services/ievent.service";
import {EventDto, toEventDto} from "../dto/event.dto";
import {ResponseMessage} from "../utils/responseMessage.util";
import {validateWithZodSchema} from "../validations/zodSchema.validation";
import {eventSchema} from "../validations/event.validation";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {prisma} from "@/servers/db/prisma";

class EventService implements IEventService {

    async createEvent(request: EventCreateInput): Promise<EventDto> {
        //----> validate inputs.
        if (!validateWithZodSchema(eventSchema, request)) {
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid event inputs!");
        }

        //----> create event in a database.
        const event = await prisma.event.create({data: request});

        //----> send back response.
        return toEventDto(event);
    }

    async deleteEventById(id: string): Promise<ResponseMessage> {
        //----> check if event exists.
        await this.getOneEvent(id);

        //----> delete event from a database.
        await prisma.event.delete({where: {id}});

        //----> send back response.
        return new ResponseMessage("Event deleted successfully!", "success", StatusCodes.OK);
    }

    async editEventById(id: string, event: Event): Promise<ResponseMessage> {
        //----> check if event exists.
        await this.getOneEvent(id);

        //----> update event in a database.
        await prisma.event.update({where: {id}, data: event});

        //----> send back response.
        return new ResponseMessage("Event updated successfully!", "success", StatusCodes.OK);
    }

    async getAllEvents(): Promise<EventDto[]> {
        //----> fetch all events from a database.
        const events = await prisma.event.findMany({});

        //----> send back response.
        return events.map(toEventDto);
    }

    async getEventById(id: string): Promise<EventDto> {
        //----> check if event exists.
        const event = await this.getOneEvent(id);

        //----> Send back response.
        return toEventDto(event);
    }

    private async getOneEvent(id: string) {
        //----> fetch event with id from a database.
        const event = await prisma.event.findUnique({where: {id}});

        //----> check if event exists.
        if(!event) throw catchError(StatusCodes.NOT_FOUND, "Event not found!");

        //----> send back event.
        return event;
    }

}

export const eventService = new EventService();