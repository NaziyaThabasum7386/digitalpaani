import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherCard = ({ title, data }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get("https://api.weatherapi.com/v1/current.json", {
          params: {
            key: "b668b48776c544818f450144230112",
            q: city,
          },
        })
        .then((res) => {
          console.log("Weather data:", res.data); // Log the weather data
          setWeatherData(res.data);
          setError(null); // Reset error state
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
          setError("Failed to fetch weather data"); // Set error state
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div className="weather-display">
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>} {/* Display error message */}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard title="Temperature" data={`${weatherData.current.temp_c}°C`} />
          <WeatherCard title="Humidity" data={`${weatherData.current.humidity}%`} />
          <WeatherCard title="Condition" data={weatherData.current.condition.text} />
          <WeatherCard title="Wind Speed" data={`${weatherData.current.wind_kph} km/h`} />
        </div>
      )}
    </div>
  );
};

function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;
