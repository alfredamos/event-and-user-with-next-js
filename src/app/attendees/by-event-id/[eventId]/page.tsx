import {getUserSessionAction} from "@/app/actions/auth.action";
import {getAttendeesByEventIdAction} from "@/app/actions/attendee.action";
import {AttendeeTable} from "@/app/attendees/AttendeeTable";

export default async function GetAttendeesByEventIdPage({params}: { params: Promise<{eventId: string}>}) {
    //----> Get user session.
    const session = await getUserSessionAction();

    //----> Check if the user is an admin.
    if (!session?.isAdmin) return <div className="h-dvh flex justify-center items-center">You are not permitted to perform this action.!</div>;

    //----> Get the event id from the params.
    const {eventId} = await params;
    const attendees = await getAttendeesByEventIdAction(eventId);



    return(
        <AttendeeTable attendees={attendees} isAdmin={session.isAdmin}/>
    );
}