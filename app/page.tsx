'use client';

import { useState, useEffect, FormEvent } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeather } from './utils/api';

const Home = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [unit, setUnit] = useState<'C' | 'F'>('C');
    const [location, setLocation] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const toggleUnit = () => setUnit((prev) => (prev === 'C' ? 'F' : 'C'));

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedLocation = location.trim();

        if (!trimmedLocation) {
            setError('Please enter a valid location.');
            setWeatherData(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchWeather(trimmedLocation);

            const forecast = data.list.map((entry: any) => ({
                dateTime: entry.dt_txt,
                temperature: entry.main.temp,
                description: entry.weather[0].description,
                icon: entry.weather[0].icon,
                windSpeed: entry.wind.speed,
                humidity: entry.main.humidity,
            }));

            setWeatherData({
                city: data.city.name,
                country: data.city.country,
                forecast,
            });
        } catch (error: any) {
            setError(error.message || 'City not found. Please try again.');
            setWeatherData(null); // Ensure weatherData is null on error
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Hydration-safe client-side logic if necessary
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl text-center mb-8">Weather App</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" disabled={isLoading} className="ml-2 p-2 bg-blue-500 text-white rounded">
                    {isLoading ? 'Loading...' : 'Search'}
                </button>
            </form>
            {error && (
                <div className="text-red-500 bg-red-100 p-2 rounded mb-4">
                    {error}
                </div>
            )}
            {isLoading && <LoadingSpinner loading={isLoading} />}
            {/* Only display weather data if there is no error */}
            {!error && weatherData && (
                <div className="border p-4 rounded shadow-md">
                    <h2 className="text-2xl">
                        {weatherData.city}, {weatherData.country}
                    </h2>
                    <p>Forecast:</p>
                    <button onClick={toggleUnit} className="mt-4 mb-2 p-2 bg-red-200 rounded">
                        Switch -> {unit === 'C' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {weatherData.forecast.map((entry: any, index: number) => (
                            <div key={`${entry.dateTime}-${index}`} className="p-2 border rounded">
                                <p>{entry.dateTime}</p>
                                <p>Temperature: {unit === 'C' ? entry.temperature : ((entry.temperature * 9) / 5 + 32).toFixed(2)}°{unit}</p>
                                <p>Description: {entry.description}</p>
                                <p>Wind: {entry.windSpeed} m/s</p>
                                <p>Humidity: {entry.humidity}%</p>
                                <img src={`http://openweathermap.org/img/wn/${entry.icon}@2x.png`} alt="Weather icon" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;