"use client"

import {EventDto} from "@/servers/dto/event.dto";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import {AttendeeUncheckedCreateInput} from "@/generated/prisma/models/Attendee";
import {createAttendeesAction} from "@/app/actions/attendee.action";
import Link from "next/link";
import {formattedDate} from "@/utils/formattedDate";

type Props = {
    events: EventDto[];
    userId: string;
}

export function EventListCards({events, userId}: Props) {
    const addEvent = async (event: EventDto) => {
        const newAttendee: AttendeeUncheckedCreateInput = {
            eventId: event.id,
            userId
        }

        //----> Create a new attendee.
        await  createAttendeesAction(newAttendee);
        redirect("/attendees");

    }

    return(
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => {
                return (
                    <div key={event.id} className="p-2 max-w-sm">
                        <div className="h-full border rounded-lg overflow-hidden">
                            <img className="w-full h-48 object-cover" src={event.image} alt={event.name}/>
                            <div className="p-4 ">
                                <h5 className="text-xl font-semibold mb-2">{event.name}</h5>
                                <p className="text-gray-600">Date: {formattedDate(new Date(event.date))}</p>
                                <p className="text-gray-600">Location: {event.location}</p>
                                <div className="flex flex-col md:flex-row gap-2 items-center mt-2">
                                    <Button variant="success" className="my-4 w-full md:flex-1" size="lg" type="button" asChild>
                                        <Link href={`/events/${event.id}/detail`}>Detail</Link></Button>
                                    <Button variant="indigo" className="my-4 w-full md:flex-1" size="lg" type="button" onClick={() => addEvent(event)}>Register</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}