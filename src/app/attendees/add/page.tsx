import {getUserSessionAction} from "@/app/actions/auth.action";
import {AttendeeCreate} from "@/servers/validations/attendee.validation";
import {Status} from "@/generated/prisma/enums";
import {getAllEventsAction} from "@/app/actions/event.action";
import {getAllUsersAction} from "@/app/actions/user.action";
import {AttendeeAddForm} from "@/app/attendees/[eventId]/[userId]/edit/AttendeeAddForm";
import {createAttendeesAction} from "@/app/actions/attendee.action";

export default async function AddAttendeePage() {
    //----> Get user session.
    const session = await getUserSessionAction();

    if (!session?.isAdmin) return <div className="h-dvh flex justify-center items-center">You are not permitted to perform this action.!</div>;

    //----> Create an attendee object.
    const attendee: AttendeeCreate = {
        eventId: "",
        userId: "",
    }

    //----> Get the events.
    const events = await getAllEventsAction();

    //----> Get the users.
    const users = await getAllUsersAction()

    return(
        <AttendeeAddForm attendee={attendee} events={events} users={users} action={createAttendeesAction}/>
    );
}