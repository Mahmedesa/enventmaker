import 
 { 
  RouterProvider, createBrowserRouter 
 } 
from "react-router-dom";
import HomePage from "./pages/Home";
import
 EventsPage,
 { 
  loader as eventLoader
 } 
from "./pages/Events";
import 
  EventDetailsPage,
   {
   loader as eventDetailLoader,
   action as deleteEventAction,
  } 
from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Roots";
import EventRootLayout from "./pages/EventRoot";
import ErrorPage from "./pages/Error";
import { 
  action as mainpulateEventAction 
} 
from "./components/EventForm";
import 
  NewsletterPage, 
  { 
    action as newsletterAction 
  }
from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventRootLayout />,
        children: [
          { index: true, 
            element: <EventsPage />, 
            loader: eventLoader },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailsPage />,
                action: deleteEventAction,
              },
              {
                path: ":edit",
                element: <EditEventPage />,
                action: mainpulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: mainpulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
