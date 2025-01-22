# weather-app
Connects to weather API to show weather forecast for a given city.

#Features and Coverage
Feature	Coverage	Implementation Notes

A. Search box that takes the city name	✅	The input and form in the UI allow users to enter a city name.

B. Activate city search (Geocoding API)	✅ (Partially)	The current implementation directly queries the Weather API. For geocoding, use the OpenWeatherMap Geocoding API to resolve city names into coordinates.

C. Switch between Degrees Celsius and Fahrenheit	✅	A toggle button is implemented with setUnit.

D. Icon showing current day's weather icons	✅	The icon is fetched using the weather[0].icon field from the API response.

E. Current temperature	✅	Displayed using data.main.temp from the API.

F. Current weather description	✅	Displayed using data.weather[0].description.

G. Date and Location	✅	Date is formatted using data.dt and location uses data.name and data.sys.country.

H. Weather for the next three days	✅	Processed using the list array in the API response, filtered for daily forecasts.

I. Wind status information	✅	Wind speed is displayed using data.wind.speed.

J. Humidity information	✅	Humidity is displayed using data.main.humidity.
