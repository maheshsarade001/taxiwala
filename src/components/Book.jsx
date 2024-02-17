import React, { useState } from "react";
import useStepStore from "../store/step";
import useRouteStore from "../store/route";
import {
  ArrowLeftCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import mini from "../assets/mini.webp";
import premier from "../assets/Premier.webp";
import delux from "../assets/Delux.webp";
import sedan from "../assets/sedan.webp";
import Button from "./Button";
import toast from "react-hot-toast";
import BookSkelton from "./BookSkelton";

const Book = () => {
  const data = [
    {
      id: "mini",
      title: "Mini",
      morningRate: 9,
      nightRate: 12,
      image: mini,
      capacity: 4,
    },

    {
      id: "prime",
      title: "Premier",
      morningRate: 23,
      nightRate: 27,
      image: premier,
      capacity: 4,
    },
    {
      id: "delux",
      title: "Delux",
      morningRate: 15,
      nightRate: 19,
      image: delux,
      capacity: 4,
    },
    {
      id: "sedan",
      title: "Sedan",
      morningRate: 18,
      nightRate: 22,
      image: sedan,
      capacity: 4,
    },
  ];

  const { current, setStep } = useStepStore((state) => ({
    setStep: state.setStep,
    current: state.current,
  }));

  const [selected, setSelacted] = useState(null);

  const { route } = useRouteStore((state) => ({
    route: state.route,
  }));

  const { setDirection, loading } = useRouteStore((state) => ({
    setDirection: state.setDirection,
    loading: state.loading,
  }));

  const calculatePrice = (data) => {
    let rate =
      new Date(route.pickupTime).getHours() > 20
        ? data.nightRate
        : data.morningRate;

    let discountedPrice =
      Math.ceil((rate * route.distanceValue) / 1000) + route.toll;

    let price = route.toll + discountedPrice + discountedPrice * 0.3;

    return { discountedPrice, price };
  };

  const onBookClick = () => {
    toast.success(`${data[selected]?.title} booked successfully`);
    setStep("Form");
    setDirection(undefined);
  };
  if (current === "Book")
    return (
      <div className="absolute top-24 left-7 bg-white  rounded-lg p-5">
        {loading ? (
          <>
            <BookSkelton />
            <BookSkelton />
            <BookSkelton />
            <BookSkelton />
          </>
        ) : (
          <div className="rounded relative">
            <div className="flex">
              <ArrowLeftCircleIcon
                onClick={() => {
                  setStep("Form");
                  setDirection(undefined);
                }}
                className="w-7 mb-2 cursor-pointer"
              />
              <h4 className="mx-auto text-lg font-bold text-gray-700">
                Select Ride
              </h4>
            </div>
            <div className="flex justify-between mb-2 text-gray-800">
              <div>
                Estimated Time :
                <span className="font-bold">{route.duration}</span>
              </div>
              <div>
                Distance : <span className="font-bold">{route.distance}</span>
              </div>
            </div>
            {data.map((data, index) => (
              <div
                key={index}
                className={`flex items-center justify-between cursor-pointer p-3 border hover:border-gray-600 mb-3 rounded-md shadow ${
                  selected === index && "border-gray-600"
                }`}
                onClick={() => {
                  setSelacted(index);
                }}
              >
                <div className="flex items-center">
                  <img src={data.image} className="w-20" />
                  <div>
                    <h3 className="text-lg text-gray-600 font-bold">
                      {data.title}
                    </h3>
                    <div className="flex items-center ">
                      <span>{data.capacity}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className=" flex items-center justify-between flex-col">
                  <div className="font-bold flex">
                    {/* <InformationCircleIcon className="w-4" /> */}
                    &nbsp; &#8377;
                    {calculatePrice(data).discountedPrice}
                  </div>
                  <p className="text-gray-400 line-through text-sm">
                    &#8377; {calculatePrice(data).price}{" "}
                  </p>
                </div>
              </div>
            ))}
            <div>
              <Button
                onClick={onBookClick}
                className="w-full mx-3"
                disabled={selected === null}
              >
                Book {selected !== null ? data[selected]?.title : "Any"}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
};

export default Book;
