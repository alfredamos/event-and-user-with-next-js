import {getAllAttendeesAction} from "@/app/actions/attendee.action";
import {getUserSessionAction} from "@/app/actions/auth.action";
import {AttendeeTable} from "@/app/attendees/AttendeeTable";

export default async function ListAttendeesPage() {
    const session = await getUserSessionAction();

    if (!session?.isAdmin) return <div>You are not permitted to view this page!</div>

    const attendees = await getAllAttendeesAction();


    return(
        <AttendeeTable attendees={attendees}/>
    );
}