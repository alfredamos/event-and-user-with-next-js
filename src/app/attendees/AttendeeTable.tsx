import {AttendeeResponse} from "@/servers/dto/attendeeRequest.dto";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DeleteAttendeeButton} from "@/app/attendees/DeleteAttendeeBurton";
import {formattedDate} from "@/utils/formattedDate";

type Props = {
    attendees: AttendeeResponse[];
    isAdmin: boolean;
}

export function AttendeeTable({attendees, isAdmin}: Props) {
    //----> Check for an empty array of customers.
    if (attendees?.length === 0) {
        return(<div className="h-dvh flex justify-center items-center gap-2">
            <h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">
            <span className="m-2">There are no attendee-events to display at this time!</span>
            <Button size="lg" variant="indigo">
                <Link href="/attendees/add" className="font-bold">
                    Add New Attendee
                </Link>
            </Button>
        </h1>

        </div>);
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <Separator className="mb-4 mt-2"/>
            <div className="flex items-center justify-between">
                <span className="font-bold">Add New Attendee</span>
                <Button asChild size="lg" >
                    <Link href="/attendees/add" className="font-bold">Add</Link>
                </Button>
            </div>
            <Separator className="mb-2 mt-2"/>
            <Table>
                <TableCaption>List of Attendees.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>UserEmail</TableHead>
                        <TableHead>UserPhone</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>UserImage</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {attendees.map((attendee) => (
                        <TableRow key={`${attendee.eventId}-${attendee.userId}`}>
                            <TableCell><img
                                src={attendee.userImage}
                                height={80}
                                width={80}
                                alt={attendee.userName}
                            /></TableCell>
                            <TableCell>{attendee.eventName}</TableCell>
                            <TableCell>{attendee.description}</TableCell>
                            <TableCell>{attendee.location}</TableCell>
                            <TableCell>{formattedDate(attendee.date)}</TableCell>
                            <TableCell>{attendee.status}</TableCell>
                            <TableCell>{attendee.userName}</TableCell>
                            <TableCell>{attendee.userEmail}</TableCell>
                            <TableCell>{attendee.userPhone}</TableCell>
                            <TableCell>{attendee.gender}</TableCell>
                            <TableCell>
                                <Button variant="indigo" className="mr-2">
                                    <Link href={`/attendees/${attendee.eventId}/${attendee.userId}/detail`} >Detail</Link>
                                </Button>
                                <DeleteAttendeeButton isAdmin={isAdmin} username={attendee.userName} eventName={attendee.eventName} eventId={attendee.eventId} userId={attendee.userId} />
                                <Button variant="back" className="m-2">
                                    <Link href={`/attendees/${attendee.eventId}/${attendee.userId}/edit`} >Edit</Link>
                                </Button>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}