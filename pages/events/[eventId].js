import { getEventById, getAllEvents } from "@/helper/api-util"
import EventSummary from "@/components/event-detail/event-summary"
import EventLogistics from "@/components/event-detail/event-logistics"
import EventContent from "@/components/event-detail/event-content"
import EventComment from "@/components/event-detail/event-comment"

export default function EventDetails({selectedEvent}){
    const event = selectedEvent
    if(!event){
        return <p>No Event Found</p>
    }
    return(
        <>
            <EventSummary title={event.title}/>
            <EventLogistics 
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <EventComment eventId={event.id} />
        </>
    )
}

export async function getStaticProps(context){
    const eventId = context.params.eventId
    const event = await getEventById(eventId)
    return {
        props : {
            selectedEvent : event
        }
    }
}

export async function getStaticPaths(context){
    const events = await getAllEvents()
    const paths = events.map(event => ({params : {eventId : event.id}}))
    return {
        paths : paths,
        fallback : false
    }
}