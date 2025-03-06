import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailedPage from "../../features/events/details/EventDetailedPage";
import EventForm from "../../features/events/form/EventForm";
import Scratch from "../../features/scratch/scratch";
import AccountPage from "../../features/auth/AccountPage";

// This component is used for setting the routing paths for a user. When using the Link function in a component 
// it will come back here and send the user the proper element they are looking to view.

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/events', element: <EventDashboard />},
            {path: '/events/:id', element: <EventDetailedPage />},
            {path: '/manage/:id', element: <EventForm />},
            {path: '/createEvent', element: <EventForm key='create'/>},
            {path: '/account', element: <AccountPage />},
            {path: '/scratch', element: <Scratch />}
        ]
    }
])