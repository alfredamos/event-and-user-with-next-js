import {getAttendeesByIdAction} from "@/app/actions/attendee.action";
import {AttendeeCard} from "@/app/attendees/[eventId]/[userId]/detail/AttendeeCard";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function DetailAttendeePage({params}: { params: Promise<{eventId: string, userId: string}>}) {
    //----> Get user session.
    const session = await getUserSessionAction();

    //----> Get the event id and user id from the params.
    const {eventId, userId} = await params;


    //----> Check if the user is an admin or owner of the event.
    if(!session?.isAdmin && session?.id !== userId) return <div className="h-dvh flex justify-center items-center">You are not permitted to view this page!</div>


    //----> Get the attendee with event id and user id from the database.
    const attendee = await getAttendeesByIdAction(eventId, userId);

    return(
        <AttendeeCard attendeeResponse={attendee} isAdmin={session.isAdmin}/>
    );
}