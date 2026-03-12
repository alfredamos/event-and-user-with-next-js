import {getAllAttendeesByUserIdAction} from "@/app/actions/attendee.action";
import {AttendeeTable} from "@/app/attendees/AttendeeTable";

export default async function GetAttendeesBuUserIdPage({params}: { params: Promise<{userId: string}> }) {
    const {userId} = await params;
    const attendees = await getAllAttendeesByUserIdAction(userId);
    return(
        <AttendeeTable attendees={attendees}/>
    );
}