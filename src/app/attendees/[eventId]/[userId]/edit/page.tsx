import {AttendeeEditForm} from "@/app/attendees/[eventId]/[userId]/edit/AttendeeEditForm";
import {editAttendeesByIdAction, getAttendeesByIdAction} from "@/app/actions/attendee.action";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function EditAttendeePage({params}: { params: Promise<{eventId: string, userId: string}>}) {
    //----> Get user session.
    const session = await getUserSessionAction();

    //----> Get the event id and user id from the params.
    const {eventId, userId} = await params;


    //----> Check if the user is an admin or owner of the event.
    if(!session?.isAdmin && session?.id !== userId) return <div className="h-dvh flex justify-center items-center">You are not permitted to perform this action!</div>

    //----> Get the attendee with event id and user id from the database.
    const attendee = await getAttendeesByIdAction(eventId, userId);

    if (!attendee) return <div className="h-dvh flex justify-center items-center">Attendee not found!</div>;

    return(
        <AttendeeEditForm attendee={attendee} action={editAttendeesByIdAction}/>
    );
}