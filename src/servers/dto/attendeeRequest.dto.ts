import {Gender, Status} from "@/generated/prisma/enums";
import {User, Event} from "@/generated/prisma/client";

export class AttendeeRequest {
    eventId?: string;
    userId?: string;
    status?: Status
}

class Attendee {
    eventId!: string;
    userId!: string;
    status!: Status;
    event!: Event;
    user!: User;
}



export class AttendeeResponse {
    eventId!: string;
    userId!: string;
    status!: Status;
    eventName!: string;
    description!: string;
    location!: string;
    date!: Date;
    userName!: string;
    userEmail!: string;
    userImage!: string;
    userPhone!: string;
    gender!: Gender;

}

export function toAttendeeResponse(attendee: Attendee): AttendeeResponse {
    return{
        eventId: attendee.eventId,
        userId: attendee.userId,
        status: attendee.status,
        eventName: attendee.event.name,
        description: attendee.event.description,
        location: attendee.event.location,
        date: attendee.event.date,
        userName: attendee.user.name,
        userEmail: attendee.user.email,
        userImage: attendee.user.image,
        userPhone: attendee.user.phone,
        gender: attendee.user.gender
    }
}

export function toAttendeeResponses(attendees: Attendee[]): AttendeeResponse[] {return attendees.map(toAttendeeResponse)}