import { json, useLoaderData, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const {events} = useLoaderData();
  return(
   <Suspense fallback={
    <p style={{textAlign: 'center'}}>
      LOADING...
    </p>}>
      <Await resolve={events}>
        {(loadedEvent) => <EventsList events={loadedEvent} /> }
      </Await>
  </Suspense> 
)}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //setError('Fetching events failed.')
    //return {isError: true, message:'Could not fetch events'}
    // throw new Response(JSON.stringify({message:'Could not fetch events'}),
    // {status:500})
    throw json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json()
    return resData.events
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
