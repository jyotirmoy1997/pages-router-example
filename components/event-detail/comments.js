import axios from "axios"
import { useEffect, useState } from "react"

export default function Comments({eventId}){
    const [comments, setComments] = useState([])
    useEffect(() => {
        async function getData(){
            const { data } = await axios.get(`/api/events/${eventId}`)
            const { result } = data
            setComments(result)
        }
        getData()
    }, [eventId])
    console.log(comments[0])
    if(comments === undefined || comments.length === 0){
        return <div>Loading...</div>
    }
    return(
        <div>
            {comments.map(comment => 
                <p key={comment._id}>
                    <span>{comment.newComment.comment}</span>
                    <span>{comment.newComment.name}</span>
                </p>)
            }
        </div>
    )
}