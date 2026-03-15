import {getEventByIdAction} from "@/app/actions/event.action";
import {EventCard} from "@/app/events/EventCard";
import {getUserSessionAction} from "@/app/actions/auth.action";

export default async function DetailEventPage({params}:{ params: Promise<{id: string}>}) {
    const {id} = await params;
    const event = await getEventByIdAction(id);
    const session = await getUserSessionAction();

    if (!session?.isLoggedIn) {
        return <div className="h-dvh flex justify-center items-center">You are not logged in, please login!</div>
    }

    return(
        <EventCard event={event} userId={session.id} isAdmin={session.isAdmin} />
    );
}