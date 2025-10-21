import {Image} from 'expo-image'
import {ColorSchemeName, StyleSheet, useColorScheme} from 'react-native'
import {Text} from 'react-native'
import ParallaxScrollView from '@/components/parallax-scroll-view'
import {JSX} from "react";
import {ThemedView} from "@/components/themed-view";

export default function Weather(): JSX.Element {
    const blurhash: string =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const colorScheme: ColorSchemeName = useColorScheme()
    return (
        <ThemedView style={styles.titleContainer}>
            <ParallaxScrollView
                headerImage={
                    <Image
                        style={{width: "100%", height: 300}}
                        source={{uri: "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg"}}
                        placeholder={blurhash}
                        contentFit="cover"
                        transition={1000}
                    />}
                headerBackgroundColor={{dark: "rgba(255,255,255,0.3)", light: "rgba(0,0,0,0.3)"}}
            >
                <Text>Hello</Text>
                <Text>World</Text>
            </ParallaxScrollView>
        </ ThemedView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
})
