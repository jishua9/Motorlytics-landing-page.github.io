// Type-only mirror of the app's weather service shapes. The marketing site
// only needs the interfaces (no API calls), so no runtime code lives here.

export interface WeatherCondition {
  id: number
  main: string // e.g. "Clear", "Rain", "Clouds"
  description: string
  icon: string // e.g. "01d", "10n"
}

export interface WeatherData {
  dt: number // Unix timestamp
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: WeatherCondition[]
  pop?: number // Probability of precipitation (0-1)
  rain?: { '1h': number }
}

export interface DailyWeatherData {
  dt: number
  temp: { day: number; min: number; max: number; night: number; eve: number; morn: number }
  feels_like: { day: number; night: number; eve: number; morn: number }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: WeatherCondition[]
  clouds: number
  pop: number
  rain?: number
  uvi: number
}
