import { EventItem } from "./event-item"
import classes from "./event-list.module.css"

export function EventList({items}){
    if(!items){
        return (
            <div>Loading...</div>
        )
    }
    return(
        <ul className={classes.list}>
            {items.map(event => 
            <EventItem
                key={event.id}
                id={event.id}
                title={event.title}
                location={event.location}
                date={event.date}
                image={event.image}
            />) }
        </ul>
    )
}