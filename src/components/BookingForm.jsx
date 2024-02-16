import { useState, useRef } from "react";
import { Autocomplete, DirectionsService } from "@react-google-maps/api";
import Button from "./Button";
import Input from "./Input";
import geocode from "react-geocode";
import useStepStore from "../store/step";
import useRouteStore from "../store/route";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      source: "",
      destination: "",
      pickupTime: new Date().toISOString().substring(0, 16),
    },
  });

  const { current, setStep } = useStepStore((state) => ({
    current: state.current,
    setStep: state.setStep,
  }));

  const { setRoute, setDirection, setLoading } = useRouteStore((state) => ({
    setRoute: state.setRoute,
    setDirection: state.setDirection,
    setLoading: state.setLoading,
  }));

  const checkLocationAccess = () => {
    if (!navigator.geolocation) {
      console.log("Location access failed!");
      return;
    }
    navigator.geolocation.getCurrentPosition(accessCurrentLocation, (error) => {
      console.log("Location access failed!");
    });
  };

  const accessCurrentLocation = (position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    geocode.setKey(import.meta.env.VITE_APP_MAP_API_KEY);
    geocode.fromLatLng(lat, lng).then(
      (response) => {
        console.log(response),
          setValue("source", response.results[0].formatted_address);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const calculateRoute = async (data) => {
    setDirection(null);
    const directionsService = new google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin: data.source,
        destination: data.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      console.log(results, "Results");
      // getTollPrice(results)
      setDirection(results);
      setRoute({
        distance: results?.routes[0]?.legs[0]?.distance?.text,
        duration: results?.routes[0]?.legs[0]?.duration?.text,
        distanceValue: results?.routes[0]?.legs[0]?.distance?.value,
        pickupTime: data?.pickupTime,
      });
      setStep("Book");
    } catch (error) {
      console.log(error);
      toast.error(
        e.code === "ZERO_RESULTS"
          ? "No route could be found between the origin and destination."
          : " Something went wrong!"
      );
    }
  };

  const getTollPrice = (results) => {
    setLoading(true);

    axios
      .post(
        "https://dev.tollguru.com/v1/calc/here",
        {
          from: {
            lat: results?.routes[0]?.legs[0]?.start_location?.lat(),
            lng: results?.routes[0]?.legs[0]?.start_location?.lng(),
          },
          to: {
            lat: results?.routes[0]?.legs[0]?.end_location?.lat(),
            lng: results?.routes[0]?.legs[0]?.end_location?.lng(),
          },
          vehicleType: "2AxlesAuto",
        },
        {
          headers: {
            "x-api-key": import.meta.env.VITE_APP_TOLL_API_KEY,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        let tolls = [];
        res.data.routes.map((route) => {
          tolls.push(...route.tolls);
        });
        let totalToll = 0;
        console.log(tolls, "tolls");
        tolls.map((toll) => {
          console.log(toll, "toll");
          totalToll = totalToll + toll.tagOneWay;
        });
        setRoute({
          toll: totalToll,
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="absolute top-24 left-7">
      <div className="bg-white py-9 px-2 w-80 rounded-lg shadow hover:shadow-xl">
        <h1 className="text-3xl font-bold leading-10 mt-0 mb-6 underline-offset-2 underline text-center">
          TAXIWALA
        </h1>
        <Autocomplete>
          <Input
            label="Source"
            {...register("source", {
              required: {
                value: true,
                message: "Please enter a source",
              },
            })}
            endIcon={
              <MapPinIcon
                className="w-6 mr-2 cursor-pointer"
                onClick={checkLocationAccess}
              />
            }
            error={errors.source}
          />
        </Autocomplete>
        <Autocomplete>
          <Input
            label="destination"
            {...register("destination", {
              required: {
                value: true,
                message: "Please enter a destination",
              },
            })}
            error={errors.destination}
          />
        </Autocomplete>
        <Input
          label="Pickup Date & Time"
          {...register("pickupTime", {
            required: {
              value: true,
              message: "Please select Pickup Date & Time",
            },
          })}
          type="datetime-local"
          min={new Date().toISOString().substring(0, 16)}
        />
        <Button className="w-full" onClick={handleSubmit(calculateRoute)}>
          Check Fare
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
