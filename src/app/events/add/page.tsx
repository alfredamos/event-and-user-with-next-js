import {EventCreate} from "@/servers/validations/event.validation"
import {createEventAction} from "@/app/actions/event.action";
import {EventCreateForm} from "@/app/events/EventCreateForm";

export default function AddEventPage() {
    const event: EventCreate = {
        name: "",
        description: "",
        image: "",
        date: "",
        location: "",
    }

    return(
        <EventCreateForm event={event} formLabel="Create" action={createEventAction}/>
    );
}