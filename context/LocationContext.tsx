import {createContext, ReactNode, useState} from "react"
import {LocationSearchResult} from "@/services/models/cities";

type LocationContextType = {
    selectedLocation: LocationSearchResult | null
    setSelectedLocation: (location: LocationSearchResult | null) => void
}

export const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({children}: { children: ReactNode }) {
    const [selectedLocation, setSelectedLocation] = useState<LocationSearchResult | null>(null)

    return (
        <LocationContext.Provider value={{selectedLocation, setSelectedLocation}}>
            {children}
        </ LocationContext.Provider>
    )
}

