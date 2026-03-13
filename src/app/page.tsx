import {getAllEventsAction} from "@/app/actions/event.action";
import {getUserSessionAction} from "@/app/actions/auth.action";
import {EventListCards} from "@/app/events/EventListCards";

export default async function Home() {
  const events = await getAllEventsAction();
  const session = await getUserSessionAction();

  if (!session) return <div>You are not logged in, please login!</div>

  return(
      <EventListCards events={events} userId={session.id}/>
  );
}
