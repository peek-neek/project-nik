import { site } from "@/lib/site"

export type WeatherKind =
  "clear" | "partly" | "cloudy" | "fog" | "drizzle" | "rain" | "snow" | "storm"

export type Weather = {
  temperature: number
  unit: "°C" | "°F"
  condition: string
  kind: WeatherKind
  isDay: boolean
}

// WMO weather codes, as returned by Open-Meteo.
const describe = (code: number): { kind: WeatherKind; condition: string } => {
  if (code === 0) return { kind: "clear", condition: "Clear sky" }
  if (code === 1) return { kind: "clear", condition: "Mostly clear" }
  if (code === 2) return { kind: "partly", condition: "Partly cloudy" }
  if (code === 3) return { kind: "cloudy", condition: "Overcast" }
  if (code === 45 || code === 48) return { kind: "fog", condition: "Foggy" }
  if (code >= 51 && code <= 57) return { kind: "drizzle", condition: "Drizzle" }
  if (code >= 61 && code <= 67) return { kind: "rain", condition: "Rain" }
  if (code >= 71 && code <= 77) return { kind: "snow", condition: "Snow" }
  if (code >= 80 && code <= 82) return { kind: "rain", condition: "Showers" }
  if (code === 85 || code === 86)
    return { kind: "snow", condition: "Snow showers" }
  if (code >= 95) return { kind: "storm", condition: "Thunderstorm" }
  return { kind: "cloudy", condition: "Cloudy" }
}

// Current weather at the site's location, refreshed at most every 15 minutes.
// Returns null if the service is slow or down, so the loader simply leaves it out.
export async function getWeather(): Promise<Weather | null> {
  const { latitude, longitude, temperatureUnit } = site.location
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weather_code,is_day",
    temperature_unit: temperatureUnit,
  })

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`,
      { next: { revalidate: 900 }, signal: AbortSignal.timeout(3000) }
    )
    if (!response.ok) return null

    const data = await response.json()
    const current = data?.current
    if (typeof current?.temperature_2m !== "number") return null

    return {
      temperature: Math.round(current.temperature_2m),
      unit: temperatureUnit === "fahrenheit" ? "°F" : "°C",
      isDay: current.is_day === 1,
      ...describe(Number(current.weather_code)),
    }
  } catch {
    return null
  }
}
