"use client"

import {Button} from "@/components/ui/button";
import {EventDto} from "@/servers/dto/event.dto";
import {AttendeeUncheckedCreateInput} from "@/generated/prisma/models/Attendee";
import {createAttendeesAction} from "@/app/actions/attendee.action";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {formattedDate} from "@/utils/formattedDate";

type Props = {
    event: EventDto;
    userId: string;
}

export function EventCard({event, userId}: Props) {
    const router = useRouter();
    const addEvent = async (event: EventDto) => {
        const newAttendee: AttendeeUncheckedCreateInput = {
            eventId: event.id,
            userId
        }

        //----> Create a new attendee.
        await  createAttendeesAction(newAttendee);
        router.push("/attendees");

    }

    return (
        <div className="min-h-screen flex justify-center items-center">
        <div
            className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/*Image replacing SVG*/}
            <img className="h-48 w-full object-cover"
                 src={event.image} alt={event.name}/>

            <div className="p-5">
                {/*Date Badge*/}
                <span
                    className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-semibold mb-3">
                    {formattedDate(new Date(event.date))}
                </span>

                {/*Title*/}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>

                {/*Description*/}
                <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                </p>

                {/*Location*/}
                <p className="text-gray-600 text-sm mb-4">
                    {event.location}
                </p>

                {/*Buttons*/}
                <Separator className="mb-4 mt-2"/>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <Button variant="indigo" className="w-full md:flex-1 m-1" size="lg" onClick={() => addEvent(event)}>
                        Register
                    </Button>
                    <Button asChild variant="back" className=" w-full md:flex-1 m-1" size="lg">
                        <Link href="/events">Back</Link>
                    </Button>
                </div>
            </div>
        </div>
        </div>
    );
}