import { useState } from "react"
import Comments from "./comments"
import axios from "axios"
import { useRef } from "react"

export default function EventComment({eventId}){
    const[vis, setVis] = useState(false)
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const commentRef = useRef(null);
    async function commentSubmitHandler(event){
        event.preventDefault()
        const email = emailRef.current.value
        const name = nameRef.current.value
        const comment = commentRef.current.value
        const res = await axios.post(`/api/events/${eventId}`, {email, name, comment})
        console.log(res)
    }
    return(
        <>
            <button onClick={() => setVis(prev => !prev)}>{vis ? "Hide Comments" : "Show Comments"}</button>
            {
                vis && 
                <>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="email" ref={emailRef} />
                        <label htmlFor="name">Name</label>
                        <input type="name" ref={nameRef} />
                        <label htmlFor="comment">Comment</label>
                        <input type="text" ref={commentRef} />
                        <button onClick={commentSubmitHandler}>Submit Comment</button>
                    </form>
                    <Comments eventId={eventId} />
                 </>
            }
            
        </>
    )
}