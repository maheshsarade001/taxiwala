import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import useRouteStore from "./store/route.js";
import BookingForm from "./components/BookingForm";
import { Toaster } from "react-hot-toast";
import Book from "./components/Book.jsx";

const center = { lat: 18.4669, lng: 73.7766 };
const libraries = ["places"];

function App() {
  const { direction } = useRouteStore((state) => ({
    direction: state.direction,
  }));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_MAP_API_KEY,
    libraries: libraries,
  });
  if (isLoaded)
    return (
      <>
        <div>
          <Toaster />
          <div className="absolute w-screen h-screen top-0 left-0">
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {direction && <DirectionsRenderer directions={direction} />}
            </GoogleMap>
          </div>
          <BookingForm />
          <Book />
        </div>
      </>
    );
}

export default App;
