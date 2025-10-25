import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
    anchor: 'screens',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? DarkTheme : DefaultTheme;

    return (
        <ThemeProvider value={theme}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <Stack>
                <Stack.Screen
                    name="screens"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="modal"
                    options={{
                        presentation: 'modal',
                        title: 'Modal',
                        headerStyle: {
                            backgroundColor: theme.colors.card,
                        },
                        headerTintColor: theme.colors.text,
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
