import React from "react"; // Se till att importera React
import { createBrowserRouter } from "react-router-dom"; // Importera router-metod från react-router-dom
import App from "./App";
import ActivityList from "./Pages/ActivityList/ActivityList";
import ActivityForm from "./Pages/ActivityForm/ActivityForm";
import EditActivity from "./Pages/EditActivity/EditActivity";
import About from "./Pages/About/About";
import ExoticTravels from "./Pages/ExoticTravels/ExoticTravels";
import NotFound from "./Components/NotFound/NotFound";
import TripList from "./Pages/TripList/TripList";
import TripForm from "./Pages/TripForm/TripForm";
import EditTrip from "./Pages/EditTrip/EditTrip";
// Skapa router med createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Välj AppLayout för huvudkomponenten
    children: [
      { index: true, element: <TripList /> }, // Default route
      { path: "add-trip", element: <TripForm /> },
      { path: "edit-trip/:id", element: <EditTrip /> },
      { path: "activity-list/:id", element: <ActivityList /> },
      { path: "add-activity", element: <ActivityForm /> },
      { path: "edit-activity/:id", element: <EditActivity /> },
      { path: "exotictravels", element: <ExoticTravels /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Exportera router-konfigurationen
export default router;
