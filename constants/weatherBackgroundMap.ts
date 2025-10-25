import {
    cloudy,
    fog,
    overcast,
    rainy,
    snow,
    stars,
    sunny,
    thunder
} from "@/assets/weather"

export const weatherBackgroundMap: Record<number, any> = {
    // ☀️ Clear / Sunny
    1000: sunny,

    // 🌤️ Cloudy variants
    1003: cloudy,
    1006: cloudy,
    1009: overcast,

    // 🌫️ Fog / Mist
    1030: fog,
    1135: fog,
    1147: fog,

    // 🌧️ Rain
    1063: rainy,
    1150: rainy,
    1153: rainy,
    1180: rainy,
    1183: rainy,
    1186: rainy,
    1189: rainy,
    1192: rainy,
    1195: rainy,
    1240: rainy,
    1243: rainy,
    1246: rainy,
    1273: thunder, // rain with thunder
    1276: thunder, // heavy rain with thunder

    // ❄️ Snow
    1066: snow,
    1210: snow,
    1213: snow,
    1216: snow,
    1219: snow,
    1222: snow,
    1225: snow,
    1255: snow,
    1258: snow,
    1279: snow,
    1282: snow,

    1087: thunder,

    1000_1: stars,
}
