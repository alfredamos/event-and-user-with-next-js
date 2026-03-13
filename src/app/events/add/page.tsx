import {EventForm} from "@/app/events/EventForm";
import {Event} from "@/servers/validations/event.validation"
import {createEventAction} from "@/app/actions/event.action";
import { v4 as uuidv4 } from 'uuid';

export default function AddEventPage() {
    const event: Event = {
        id: uuidv4(),
        name: "",
        description: "",
        image: "",
        date: "",
        location: "",
    }

    return(
        <EventForm event={event} formLabel="Create" action={createEventAction}/>
    );
}