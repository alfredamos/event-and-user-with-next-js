import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import SearchBar from "@/components/users/SearchBar";
import Link from "next/link";
import {TableCaption, TableHeader, Table, TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";
import {DeleteResourceButton} from "@/utils/DeleteResourceButton";
import {EventDto} from "@/servers/dto/event.dto";
import {deleteEventByIdAction} from "@/app/actions/event.action";
import {formattedDate} from "@/utils/formattedDate";

type Props = {
    events: EventDto[]
}


export function EventTable({events}: Props) {
    //----> Check for an empty array of customers.
    if (events?.length === 0) {
        return(<div className="h-dvh flex justify-center items-center gap-2">
            <h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">
                <span className="m-2">There are no events to display at this time!</span>
                <Button size="lg" variant="indigo">
                    <Link href="/events/add" className="font-bold">
                        Add New Event
                    </Link>
                </Button>
            </h1>

        </div>);
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <Separator className="mb-4 mt-2"/>
            <div className="flex items-center justify-between">
                <span className="font-bold">Add New Event</span>
                <Button asChild size="lg" >
                    <Link href="/events/add" className="font-bold">Add</Link>
                </Button>
            </div>
            <Separator className="mb-2 mt-4"/>
            <SearchBar path="/events" />
            <Separator className="mb-2 mt-2"/>
            <Table>
                <TableCaption>List of Events.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events.map((event) => (
                        <TableRow key={event.id}>
                            <TableCell><img
                                src={event.image}
                                height={80}
                                width={80}
                                alt={event.name}
                            /></TableCell>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{event.description}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell>{formattedDate(new Date(event.date))}</TableCell>
                            <TableCell>
                                <Button variant="success" className="m-2">
                                    <Link href={`/events/${event.id}/detail`} >Detail</Link>
                                </Button>
                                <DeleteResourceButton name={event.name} id={event.id as string} path={"/events"} action={deleteEventByIdAction}/>
                                <Button variant="back" className="m-2">
                                    <Link href={`/events/${event.id}/edit`}>
                                        Edit
                                    </Link>
                                </Button>
                                <Button variant="indigo" className="m-2">
                                    <Link href={`/attendees/by-event-id/${event.id}`}>
                                        Attendees
                                    </Link>
                                </Button>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}