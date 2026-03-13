import {Event} from "@/generated/prisma/client"

export class EventDto {
    id: string = "";
    name: string = "";
    description: string = "";
    image: string = "";
    location: string = "";
    date: string = "";

    constructor() {
        this.id = "";
        this.name = "";
        this.description = "";
        this.location = "";
        this.date = "";
    }
}

export class EventRequest {
    id!: string;
    name!: string;
    description!: string;
    location!: string;
    date!: Date;
    createdAt!: Date;
    updatedAt!: Date;

}

export function toEventDto(event: Event): EventDto {
    return{
        id: event.id,
        name: event.name,
        image: event.image,
        description: event.description,
        location: event.location,
        date: (event.date).toString()
    }
}
