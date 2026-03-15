import {getUserSessionAction} from "@/app/actions/auth.action";
import {getAttendeesByStatusAction} from "@/app/actions/attendee.action";
import {AttendeeTable} from "@/app/attendees/AttendeeTable";

export default async function GetAttendeesByStatusPage({params}: { params: Promise<{status: string}>}) {
    //----> Get user session.
    const session = await getUserSessionAction();

    //----> Check if the user is an admin.
    if (!session?.isAdmin) return <div className="h-dvh flex justify-center items-center">You are not permitted to perform this action.!</div>;

    //----> Get the status from the params.
    const {status} = await params;
    const attendees = await getAttendeesByStatusAction(status);

    return(
        <AttendeeTable attendees={attendees} isAdmin={session.isAdmin}/>
    );
}