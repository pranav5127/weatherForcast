import { Redirect } from "expo-router";

export default function Index() {
    // Redirect from root to the main home screen inside (tabs)
    // @ts-ignore
    return <Redirect href="(tabs)" />;
}
