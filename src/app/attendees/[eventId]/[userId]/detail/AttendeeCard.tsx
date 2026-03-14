import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {Check, X} from "lucide-react";
import {AttendeeResponse} from "@/servers/dto/attendeeRequest.dto";
import {formattedDate} from "@/utils/formattedDate";
import {Status} from "@/generated/prisma/enums";

type Props = {
    isAdmin: boolean;
    attendeeResponse: AttendeeResponse;
}

export function AttendeeCard({ attendeeResponse, isAdmin,}: Props) {
    return (
        <div className="flex flex-col max-w-sm mx-auto my-auto mt-10 ring-2 ring-gray-300 dark:text-gray-400 dark:ring-gray-600 p-2 rounded-t-md mb-10 shadow-xl">
            <div className="flex items-center justify-between">
                <div className="flex-col items-center">
                    <p className="text-sm text-start font-bold">User</p>
                    <div className="flex flex-col items-center md:flex-row md:justify-between m-1 gap-2">
                        <img src={attendeeResponse.userImage} alt={attendeeResponse.userName} className="rounded-full h-10 w-10"/>
                        <p className="text-sm">{attendeeResponse.userName}</p>
                    </div>
                </div>
                <div className="flex-col items-center">
                    <p className="text-sm text-start font-bold">Event</p>
                    <div className="flex flex-col items-center md:flex-row md:justify-between m-1 gap-2">
                        <img src={attendeeResponse.eventImage} alt={attendeeResponse.eventName} className="rounded-full h-10 w-10"/>
                        <p className="text-sm">{attendeeResponse.eventName}</p>
                    </div>
                </div>
            </div>
            <Separator className="text-gray-600 mt-2"/>
            <div className="w-full">
                <div className="">
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Title</span>
                        <span className="text-start">{attendeeResponse.eventName}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Location</span>
                        <span className="text-start">{attendeeResponse.location}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Date</span>
                        <span className="text-start">{formattedDate(attendeeResponse.date)}</span>
                    </p>

                    <p className="flex flex-col mt-2 mb-2">
                        <span className="text-sm">Description</span>
                        <span className="break-words">{attendeeResponse.description}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Status</span>
                        <span className="text-start">{attendeeResponse.status === Status.Registered ? <Check className="text-green-500"/> : <X className="text-red-500"/>}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Email</span>
                        <span className="text-start">{attendeeResponse.userEmail}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Phone</span>
                        <span className="text-start">{attendeeResponse.userPhone}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Gender</span>
                        <span className="text-start">{attendeeResponse.gender}</span>
                    </p>
                </div>
                <Separator className="mt-2"/>
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between h-full mb-5 mt-5">
                    <Button variant="indigo" size="lg" className="w-full md:flex-1" asChild>
                        <Link href={`${isAdmin ? "/attendees" : `/attendees/by-user-id/${attendeeResponse.userId}`}`}>Back</Link>
                    </Button>
                    <Button variant="back" size="lg" className="w-full md:flex-1" asChild>
                        <Link href={`/attendees/${attendeeResponse.eventId}/${attendeeResponse.userId}/edit`}>Edit</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}