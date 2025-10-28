import {createContext, ReactNode, useState} from "react"
import {LocationSearchResult} from "@/services/models/cities";

type TemperatureUnit = "C" | "F"

type AppContextType = {
    selectedLocation: LocationSearchResult | null
    setSelectedLocation: (location: LocationSearchResult | null) => void
    temperatureUnit: TemperatureUnit
    setTemperatureUnit: (unit: TemperatureUnit) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export function LocationProvider({children}: { children: ReactNode }) {
    const [selectedLocation, setSelectedLocation] = useState<LocationSearchResult | null>(null)
    const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C")

    return (
        <AppContext.Provider value={{selectedLocation, setSelectedLocation, temperatureUnit, setTemperatureUnit}}>
            {children}
        </ AppContext.Provider>
    )
}

