"use client";
import { useState, useEffect } from "react";
import logo from "../assets/jnLogo.png";
import Image from "next/image";

const NotificationComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkNotificationSettings = () => {
      const permissionGranted =
        localStorage.getItem("notificationAllowed") === "true";
      const popupClosedTime = sessionStorage.getItem("popupClosedTime");
      const currentTime = Date.now();
      const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

      // Show the popup if notifications are not allowed yet
      if (!permissionGranted) {
        // Check if the popup was closed within the last 2 hours
        if (!popupClosedTime || currentTime - popupClosedTime >= twoHours) {
          setShowPopup(true); // Show popup if not closed or more than 2 hours passed
        }
      }
    };

    checkNotificationSettings();
  }, []);

  const handleNotificationSetup = async () => {
    try {
      if (!("Notification" in window) || !("serviceWorker" in navigator)) {
        console.error(
          "Notifications or Service Workers are not supported by this browser."
        );
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered:", registration);
        localStorage.setItem("notificationAllowed", "true"); // Store in localStorage
        setShowPopup(false); // Hide popup after permission is granted
      } else {
        console.error("Notification permission denied.");
      }
    } catch (error) {
      console.error("Error during setup:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup when user clicks "No Thanks"
    sessionStorage.setItem("popupClosedTime", Date.now()); // Store current time in sessionStorage
  };

  return (
    <>
      {showPopup && (
        <div className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center mr-10 max-h-fit max-w-96">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center h-[100px] w-[120px]">
                <Image
                  src={logo}
                  alt="logo"
                  width={500}
                  height={500}
                  className="mb-4 object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-medium mb-2 text-start">
                  ताज़ा जानकारी और समाचार पाने के लिए सब्सक्राइब करें।
                </h2>
                <div className="flex justify-between mt-5">
                  <button
                    onClick={handleClosePopup}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    No Thanks
                  </button>
                  <button
                    onClick={handleNotificationSetup}
                    className="bg-blue text-white px-4 py-2 rounded"
                  >
                    Allow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationComponent;
