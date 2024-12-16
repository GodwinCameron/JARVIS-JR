import { fetchWeatherApi } from 'openmeteo';

const params = {
	"latitude": -25.8589,
	"longitude": 28.1858,
	"hourly": "temperature_2m"
};
const url = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherData() {
	try {
		const responses = await fetchWeatherApi(url, params);
		
		// Process first location. Add a for-loop for multiple locations or weather models
		const response = responses[0];

		// Attributes for timezone and location
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const timezone = response.timezone();
		const timezoneAbbreviation = response.timezoneAbbreviation();
		const latitude = response.latitude();
		const longitude = response.longitude();

		const hourly = response.hourly();

		// Helper function to form time ranges
		const range = (start, stop, step) =>
			Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

		// Note: The order of weather variables in the URL query and the indices below need to match!
		const weatherData = {
			hourly: {
				time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				temperature2m: hourly.variables(0).valuesArray(),
			},
		};

		// `weatherData` now contains a simple structure with arrays for datetime and weather data
		for (let i = 0; i < weatherData.hourly.time.length; i++) {
			console.log(
				weatherData.hourly.time[i].toISOString(),
				weatherData.hourly.temperature2m[i]
			);
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}
