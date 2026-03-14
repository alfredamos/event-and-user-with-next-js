import {EventCreateInput, EventUncheckedUpdateInput} from "@/generated/prisma/models";
import {IEventService} from "@/servers/services/ievent.service";
import {EventDto, toEventDto} from "../dto/event.dto";
import {ResponseMessage} from "../utils/responseMessage.util";
import {validateWithZodSchema} from "../validations/zodSchema.validation";
import {eventCreateSchema, eventUpdateSchema} from "../validations/event.validation";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {prisma} from "@/servers/db/prisma";

class EventService implements IEventService {

    async createEvent(request: EventCreateInput): Promise<EventDto> {
        //----> validate inputs.
        if (!validateWithZodSchema(eventCreateSchema, request)) {
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid event inputs!");
        }

        //----> convert a date to a date object.
        request.date = new Date(request.date);

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

    async editEventById(id: string, event: EventUncheckedUpdateInput): Promise<ResponseMessage> {
        //----> validate inputs.
        if (!validateWithZodSchema(eventUpdateSchema, event)) {
            throw catchError(StatusCodes.BAD_REQUEST, "Invalid event inputs!");
        }

        //----> check if event exists.
        await this.getOneEvent(id);


        //----> convert a date to a date object.
        event.date = new Date(event.date as string);

        //----> update event in a database.
        await prisma.event.update({where: {id}, data: event});

        //----> send back response.
        return new ResponseMessage("Event updated successfully!", "success", StatusCodes.OK);
    }

    async getAllEvents(query?: string): Promise<EventDto[]> {
        //----> Fetch all users from a database
        if(query){
            return ((await prisma.event.findMany({where: {
                    OR:[
                        {description : {contains : query}},
                        {location : {contains : query}},
                        {name : {contains : query}},
                    ],}
            })).map(toEventDto));
        }

        //----> Fetch all authors.
        return ((await prisma.event.findMany({})).map(toEventDto));
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