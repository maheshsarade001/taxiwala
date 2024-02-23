import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import useRouteStore from "../store/route.js";
import BookingForm from "./BookingForm.jsx";
import toast, { Toaster } from "react-hot-toast";
import Book from "./Book.jsx";
import useAuthStore from "../store/auth.js";
import { useNavigate } from "react-router-dom";

const center = { lat: 18.4669, lng: 73.7766 };
const libraries = ["places"];

const Home = () => {
  const navigate = useNavigate();

  // Logout function
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="absolute w-screen h-screen top-0 left-0 -z-10">
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
          <div className="absolute right-0 bottom-14">
            <button
              onClick={handleLogout}
              className="px-6 py-2 border bg-slate-800 text-gray-300 rounded-l-full"
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
};

export default Home;
