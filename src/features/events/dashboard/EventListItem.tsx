import { Button, Icon, Item, ItemGroup, Label, List, Segment, SegmentGroup } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/events";
import { Link } from "react-router-dom";

type Props = {
    event: AppEvent;
}

export default function EventListItem({event}: Props) {

  return (
    <SegmentGroup>
        <Segment>
            <ItemGroup>
                <Item>
                    <Item.Image size='tiny' circular src={event.hostPhotoURL || '/user.png'}/>
                    <Item.Content>
                        <Item.Header>{event.title}</Item.Header>
                        <Item.Description>
                            Hosted by {event.hostedBy}
                        </Item.Description>
                        {event.isCancelled && (
                            <Label 
                                style={{top: '-40px'}}
                                ribbon='right'
                                color='red'
                                content='This event has been cancelled'
                            />
                        )}
                    </Item.Content>
                </Item>
            </ItemGroup>
        </Segment>
        <Segment>
            <span>
                <Icon name='clock'/> {event.date}
                <Icon name='clock'/> {event.venue}
            </span>
        </Segment>
        <Segment secondary>
            <List horizontal>
                {event.attendees.map((attendee: any) =>(
                <EventListAttendee key={attendee.id} attendee={attendee}/>
                ))}
            </List>
        </Segment>
        <Segment clearing>
            <span>{event.description}</span>
            <Button as={Link} to={`/events/${event.id}`}color='teal' floated='right' content='View' />
        </Segment>
    </SegmentGroup>
  )
}
