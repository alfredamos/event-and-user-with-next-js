import {editEventByIdAction, getEventByIdAction} from "@/app/actions/event.action";
import {EventForm} from "@/app/events/EventForm";

export default async function EditEventPage({params}:{params: Promise<{id: string}>}) {
    const {id} = await params;
    const event = await getEventByIdAction(id);

    return(
        <EventForm event={event} formLabel="Edit" action={editEventByIdAction}/>
    );
}