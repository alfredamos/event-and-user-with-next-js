import {EventCreate} from "@/servers/validations/event.validation"
import {createEventAction} from "@/app/actions/event.action";
import {EventCreateForm} from "@/app/events/EventCreateForm";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function AddEventPage() {
    //----> Get user session.
    const session = await getUserSessionAction();

    if (!session?.isAdmin) return <div className="h-dvh flex justify-center items-center">You are not permitted to perform this action.!</div>;

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