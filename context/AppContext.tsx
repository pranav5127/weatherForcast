import { createContext, ReactNode, useEffect, useState } from "react"
import { LocationSearchResult } from "@/services/models/cities"
import * as SecureStore from "expo-secure-store"
import * as Location from "expo-location"

type TemperatureUnit = "C" | "F"

type AppContextType = {
    selectedLocation: LocationSearchResult | null
    setSelectedLocation: (location: LocationSearchResult | null) => void
    temperatureUnit: TemperatureUnit
    setTemperatureUnit: (unit: TemperatureUnit) => void
    currentLocation: Location.LocationObject | null
    errorMsg: string | null
    refreshCurrentLocation: () => Promise<void>
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
    const [selectedLocation, setSelectedLocationState] = useState<LocationSearchResult | null>(null)
    const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C")
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const refreshCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied")
                return
            }

            const loc = await Location.getCurrentPositionAsync({})
            setCurrentLocation(loc)

            setSelectedLocationState(null)
            await SecureStore.deleteItemAsync("selectedLocation")
        } catch (err) {
            console.error("Failed to get current location:", err)
            setErrorMsg("Failed to get location: " + err)
        }
    }

    useEffect(() => {
        const loadStoredLocation = async () => {
            try {
                const saved = await SecureStore.getItemAsync("selectedLocation")
                if (saved) setSelectedLocationState(JSON.parse(saved))
            } catch (err) {
                console.error("Error loading stored location:", err)
            }
        }
        loadStoredLocation()
    }, [])

    useEffect(() => {
        refreshCurrentLocation().then()
    }, [])

    const setSelectedLocation = async (location: LocationSearchResult | null) => {
        try {
            setSelectedLocationState(location)
            if (location) {
                await SecureStore.setItemAsync("selectedLocation", JSON.stringify(location))
            } else {
                await SecureStore.deleteItemAsync("selectedLocation")
            }
        } catch (err) {
            console.error("Error saving selected location:", err)
        }
    }

    return (
        <AppContext.Provider
            value={{
                selectedLocation,
                setSelectedLocation,
                temperatureUnit,
                setTemperatureUnit,
                currentLocation,
                errorMsg,
                refreshCurrentLocation,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
