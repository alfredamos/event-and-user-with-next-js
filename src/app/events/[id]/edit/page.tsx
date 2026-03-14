import {editEventByIdAction, getEventByIdAction} from "@/app/actions/event.action";
import {EventUpdateForm} from "@/app/events/EventUpdateForm";

export default async function EditEventPage({params}:{params: Promise<{id: string}>}) {
    const {id} = await params;
    const event = await getEventByIdAction(id);

    return(
        <EventUpdateForm event={event} formLabel="Edit" action={editEventByIdAction}/>
    );
}