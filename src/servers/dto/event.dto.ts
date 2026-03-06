import {Event} from "../generated/prisma/client";

export class EventDto {
    id: string;
    name: string;
    description: string;
    location: string;
    date: Date;
}

export class EventRequest {
    id: string;
    name: string;
    description: string;
    location: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export function toEventDto(event: Event): EventDto {
    return{
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        date: event.date
    }
}
