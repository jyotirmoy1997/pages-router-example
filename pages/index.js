import Head from 'next/head'
import { getFeaturedEvents } from '@/helper/api-util';
import { EventList } from '@/components/events/event-list'
import { useRef } from 'react';
import axios from 'axios';


export default function Home({featuredEvents}) {
  const inputRef = useRef(null)
  async function signUpHandler(event){
    event.preventDefault()
      const res = await axios.post("/api/newsletter", {email : inputRef.current.value})
      console.log(res)
  }
  return (
    <>
    {/* <div>Now</div> */}
      <Head>
        <title>Events</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form>
          <input type='email' ref={inputRef}/>
          <button onClick={signUpHandler}>Sign Up !</button>
        </form>
        <EventList items={featuredEvents} />
      </main>
    </>
  )
}


export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents()

  return {
    props : {
      featuredEvents : featuredEvents
    }
  }
}