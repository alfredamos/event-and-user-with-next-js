import {AttendeeForm} from "@/app/attendees/[eventId]/[userId]/edit/AttendeeForm";
import {editAttendeesByIdAction, getAttendeesByIdAction} from "@/app/actions/attendee.action";

export default async function EditAttendeePage({params}: { params: Promise<{eventId: string, userId: string}>}) {
    //----> Get the event id and user id from the params.
    const {eventId, userId} = await params;

    //----> Get the attendee with event id and user id from the database.
    const attendee = await getAttendeesByIdAction(eventId, userId);

    if (!attendee) return <div>Attendee not found!</div>;

    return(
        <AttendeeForm attendee={attendee} action={editAttendeesByIdAction}/>
    );
}