import {EventCreateInput} from "@/generated/prisma/models/Event";
import {Event} from "@/generated/prisma/client";
import {EventDto} from "@/servers/dto/event.dto";
import {ResponseMessage} from "@/servers/utils/responseMessage.util";

export interface IEventService {
    createEvent(request: EventCreateInput): Promise<EventDto>
    deleteEventById(id: string): Promise<ResponseMessage>
    editEventById(id: string, request: Event): Promise<ResponseMessage>
    getAllEvents(): Promise<EventDto[]>
    getEventById(id: string): Promise<EventDto>
}