import {EventModel} from "@/generated/prisma/models/Event";
import {Event} from "@/servers/validations/event.validation";

export function toEvent(event: EventModel): Event{
    return {
        id: event.id,
        name: event.name,
        description: event.description,
        image: event.image,
        location: event.location,
        date: (event.date).toString()
    }
}