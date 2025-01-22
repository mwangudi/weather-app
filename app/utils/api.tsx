
export const fetchWeather = async (city: string) => {
    const response = await fetch(`http://127.0.0.1:8000/api/weather?city=${city}`);
    if (!response.ok) {
        throw new Error('City not found. Please try again.');
    }
    return response.json();
};
