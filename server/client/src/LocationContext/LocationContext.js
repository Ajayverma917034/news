import { createContext, useContext } from "react";

// Creating LocationContext
export const LocationContext = createContext();

// Creating UseLocationContext Hook
export const useLocationContext = () => {
    return useContext(LocationContext);
}