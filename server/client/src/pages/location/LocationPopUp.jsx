import React, { useState } from "react";
// LocationPopUp CSS
import "./LocationPopUp.css";

// Cookies
import Cookies from "js-cookie";

// Axios
import axios from "axios";

// useLocationContext Custom Hook

// Parcel logo
import parcel from "../../assets/favicon.png";
import { useLocationContext } from "../../LocationContext/LocationContext";

const LocationPopUp = () => {
  // Location Context
  const {
    setOpenLocation,
    isLocationFetched,
    setIsLocationFetched,
    setPostcode,
  } = useLocationContext();

  // Address UseState
  const [address, setAddress] = useState(null);
  // Error UseState
  const [error, setError] = useState(null);

  const [openFetch, setOpenFetch] = useState(false);

  // Get Location Func
  const getLocation = () => {
    // Check Navigator
    if (navigator.geolocation) {
      // Find Current Position Callback
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          // Latitude
          const lat = position.coords.latitude;
          // Longitude
          const lng = position.coords.longitude;
          // Fetching Address by Latitude & Longitude
          getAddress(lat, lng);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Get Address Func
  const getAddress = async (lat, lng) => {
    // Fetching blinking start
    setOpenFetch(true);

    // Fetching address API
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      )
      .then((res) => {
        // Get the data
        const { city, state, country, postcode } = res.data.address;
        setAddress({
          city: city || "",
          state: state || "",
          country: country || "",
          postcode: postcode || "",
        });

        // Store the data
        Cookies.set("city", city);
        Cookies.set("state", state);
        Cookies.set("country", country);
        Cookies.set("postcode", postcode);

        // Fetching blinking end
        setOpenFetch(false);

        // Pop up close
        setOpenLocation(false);
        // Location fetched
        setIsLocationFetched(true);

        // Setting Pincode
        setPostcode(postcode || "");
      })
      .catch((err) => {
        setOpenFetch(false);
        // console.log(err);
        setError("Location fetching error!!");
      });
  };

  return (
    <>
      {/* Main Overlay Container */}
      <div className="popup-overlay">
        <div
          className="sizeBox"
          style={{
            justifyContent: "flex-end",
          }}
        >
          {/* PopUp Box */}
          <div className="location-popup">
            {/* Up Box */}
            <div className="up">
              <h4
                dangerouslySetInnerHTML={{
                  __html: isLocationFetched
                    ? "Change Location"
                    : "Welcome to <strong>apnaparcel</strong>",
                }}
              />
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenLocation(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* Bliking Box */}
            {openFetch && (
              <div className="blinking">
                <div className="blinkBox">
                  <span
                    style={{
                      margin: "3px",
                    }}
                  ></span>
                  <span
                    style={{
                      margin: "3px",
                    }}
                  ></span>
                  <span
                    style={{
                      margin: "3px",
                    }}
                  ></span>
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    marginLeft: "10px",
                  }}
                >
                  Fetching your location
                </p>
              </div>
            )}

            {/* Details for first fetching */}
            {!isLocationFetched && !openFetch && (
              <div className="middle">
                <img src={parcel} alt="" draggable="false" />
                <p>
                  Please provide your delivery location to see products at
                  nearby store
                </p>
              </div>
            )}

            {/* Detect Location Button */}
            {!openFetch && (
              <button onClick={getLocation}>Detect my location</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationPopUp;
