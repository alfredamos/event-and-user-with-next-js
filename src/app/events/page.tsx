import {getAllEventsAction} from "@/app/actions/event.action";
import {getUserSessionAction} from "@/app/actions/auth.action";
import {EventTable} from "@/app/events/EventTable";

export default async function ListEventsPage({searchParams}:{searchParams: Promise<{query?: string}>}){
    //----> Get the search params if there are any.
    const {query} = await searchParams;

    const events = await getAllEventsAction(query);
    const session = await getUserSessionAction();

    if (!session?.isAdmin) return <div>You are not permitted to view this page!</div>

    return(
        <EventTable events={events}/>
    );
}