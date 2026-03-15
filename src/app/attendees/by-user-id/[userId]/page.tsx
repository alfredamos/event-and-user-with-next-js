import {getAllAttendeesByUserIdAction} from "@/app/actions/attendee.action";
import {AttendeeTable} from "@/app/attendees/AttendeeTable";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function GetAttendeesBuUserIdPage({params}: { params: Promise<{userId: string}> }) {
    //----> Get the user session.
    const session = await getUserSessionAction();

    //----> Get the user id from the params.
    const {userId} = await params;

    //----> Check if the user is an admin or owner of the event.
    if(!session?.isAdmin && session?.id !== userId) return <div className="h-dvh flex justify-center items-center">You are not permitted to view this page!</div>


    const attendees = await getAllAttendeesByUserIdAction(userId);
    return(
        <AttendeeTable attendees={attendees} isAdmin={session.isAdmin}/>
    );
}