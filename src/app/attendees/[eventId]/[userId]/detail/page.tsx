import {getAttendeesByIdAction} from "@/app/actions/attendee.action";
import {AttendeeCard} from "@/app/attendees/[eventId]/[userId]/detail/AttendeeCard";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function DetailAttendeePage({params}: { params: Promise<{eventId: string, userId: string}>}) {
    //----> Get user session.
    const session = await getUserSessionAction();

    if (!session?.isLoggedIn) return <div>You are not logged in, please login!</div>;

    //----> Get the event id and user id from the params.
    const {eventId, userId} = await params;

    //----> Get the attendee with event id and user id from the database.
    const attendee = await getAttendeesByIdAction(eventId, userId);

    return(
        <AttendeeCard attendeeResponse={attendee} isAdmin={session.isAdmin}/>
    );
}