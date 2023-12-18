import { useRouter } from "next/router"
import { getFilteredEvents } from "@/dummy-data"
import { EventList } from "@/components/events/event-list"

export default function FilteredEventsPage(){
    const router = useRouter()
    const filteredData = router.query.slug
    if(!filteredData)
        return <p>Loading...</p>


    const filteredYear = +filteredData[0];
    const filteredMonth = +filteredData[1];

    if(isNaN(filteredYear) || isNaN(filteredMonth))
        return <p>Invalid Filter</p>
    

    const filteredEvents = getFilteredEvents({
        year : filteredYear,
        month : filteredMonth
    })

    if(!filteredEvents || filteredEvents.length === 0)
        return <p>No Events Found</p>

    return(
        <div>
            <EventList items={filteredEvents}/>
        </div>
    )
}