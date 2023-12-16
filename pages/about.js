import { useRouter } from "next/router"

export default function About(){
    const router = useRouter()
    function gotoHome(){
        router.push('/')
    }
    return <>
        <h1>This is About Page</h1>
        <button onClick={gotoHome}>Go to Home</button>
    </> 
}