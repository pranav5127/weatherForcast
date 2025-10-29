import {JSX, useEffect, useState} from "react"
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native"
import {Searchbar, Text, ActivityIndicator, Card} from "react-native-paper"
import {useTheme} from "@react-navigation/native"
import useDebounce from "@/hooks/useDebounce"
import {LocationSearchResponse, LocationSearchResult} from "@/services/models/cities"
import {getCities} from "@/services/getCities"
import {useAppContext} from "@/hooks/useAppContext";
import {useRouter} from "expo-router";

function Search(): JSX.Element {
    const {colors, dark} = useTheme()
    const [searchTerm, setSearchTerm] = useState<string>("")
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const [cities, setCities] = useState<LocationSearchResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const {selectedLocation, setSelectedLocation} = useAppContext()
    const router = useRouter()

    useEffect(() => {
        if (debouncedSearchTerm.trim() === "") {
            setCities(null)
            return
        }

        const fetchCities = async () => {
            setLoading(true)
            try {
                const data = await getCities(debouncedSearchTerm)
                setCities(data)
            } catch (err) {
                console.error("Cannot perform search", err)
            } finally {
                setLoading(false)
            }
        }

        fetchCities().then((cities) => console.log(cities))
    }, [debouncedSearchTerm])

    const handleSelectCity = (city: LocationSearchResult) => {
        setSelectedLocation(city)
        setSearchTerm("")
        setCities(null)
        router.push("/screens/home")
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Searchbar
                placeholder="Search cities..."
                onChangeText={setSearchTerm}
                value={searchTerm}
                style={[styles.searchbar, {backgroundColor: colors.card, color: colors.text}]}
                inputStyle={{color: colors.text}}
                placeholderTextColor={dark ? "#aaa" : "#666"}
            />

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator animating size="large" color={colors.primary}/>
                    <Text style={[styles.loadingText, {color: colors.text}]}>Loading...</Text>
                </View>
            )}

            {cities && (
                <FlatList
                    data={cities}
                    keyExtractor={(item) => item.id?.toString() || item.name}
                    contentContainerStyle={{paddingVertical: 8}}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => handleSelectCity(item)}>
                            <Card
                                style={[
                                    styles.card,
                                    {
                                        backgroundColor:
                                            selectedLocation?.id === item.id
                                                ? colors.primary + "33"
                                                : colors.card
                                    }
                                ]}
                            >
                                <Card.Content>
                                    <Text style={{color: colors.text, fontWeight: "bold"}}>{item.name}</Text>
                                    <Text style={{color: dark ? "#ccc" : "#555"}}>{item.region}</Text>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )
}


export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 12
    },
    searchbar: {
        borderRadius: 10,
        marginBottom: 12
    },
    loadingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12
    },
    loadingText: {
        marginLeft: 8,
        fontSize: 16
    },
    card: {
        marginVertical: 6,
        marginHorizontal: 2,
        borderRadius: 10,
        elevation: 3
    }
})
