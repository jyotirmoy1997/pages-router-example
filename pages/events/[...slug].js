import { EventList } from "@/components/events/event-list"
import { getFilteredEvents } from "@/helper/api-util"

export default function FilteredEventsPage(props){
    if(props.hasError)
        return <p>Invalid Filter</p>
    

    if(props.noEvent)
        return <p>No Events Found</p>

    return(
        <div>
            <EventList items={filteredEvents}/>
        </div>
    )
}

export async function getServerSideProps(context){
    const filteredData = context.params.slug
    const filteredYear = +filteredData[0];
    const filteredMonth = +filteredData[1];
    if(isNaN(filteredYear) || isNaN(filteredMonth)){
        return {
            props : {
                hasError : true
            }
        }
    }
    const filteredEvents = await getFilteredEvents({
            year : filteredYear,
            month : filteredMonth
    })
    
    if(!filteredEvents || filteredEvents.length === 0){
        return {
            props : {
                noEvent : true
            }
        }
    }
    return{
        props : {
            filteredEvents : filteredEvents
        }
    }
}