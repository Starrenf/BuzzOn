import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import AddEventPage from "./pages/AddEventPage";
import OverOns from "./pages/OverOns";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "events/:id",
        element: <EventPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "add-event",
        element: <AddEventPage />,
      },
      {
        path: "over-ons",
        element: <OverOns />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
