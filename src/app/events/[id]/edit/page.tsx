import {editEventByIdAction, getEventByIdAction} from "@/app/actions/event.action";
import {EventUpdateForm} from "@/app/events/EventUpdateForm";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function EditEventPage({params}:{params: Promise<{id: string}>}) {
    //----> Get user session.
    const session = await getUserSessionAction();

    if (!session?.isAdmin) return <div className="h-dvh flex justify-center items-center">You are not permitted to perform this action.!</div>;

    const {id} = await params;
    const event = await getEventByIdAction(id);

    return(
        <EventUpdateForm event={event} formLabel="Edit" action={editEventByIdAction}/>
    );
}