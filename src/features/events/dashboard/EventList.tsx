import { AppEvent } from "../../../app/types/events";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
}

export default function EventList({events}: Props) {
  return (
    <>
      {events.map(event => (
        <EventListItem 
          key={event.id} 
          event={event}
        />
      ))}
    </>
  )
}
