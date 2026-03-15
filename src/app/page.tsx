import {getAllEventsAction} from "@/app/actions/event.action";
import {EventListCards} from "@/app/events/EventListCards";
import {getUserSessionAction} from "@/app/actions/auth.action";
import {Session} from "@/servers/models/session.model";

export default async function Home() {
  //-----> Get user session.
  const session = await getUserSessionAction();

  //-----> Get the events.
  const events = await getAllEventsAction();

  return(
      <EventListCards events={events} session={session}/>
  );
}
