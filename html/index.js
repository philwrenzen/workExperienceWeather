// Copilot prompt: How can I get data from open-meteo by using fetch in javascript

const fetchWeatherData = async (latitude, longitude, placeName) => {
  console.log('Fetching weather for ', placeName, ' at ', latitude, ', ', longitude); // update

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    // updated to include weather description
    const output = { ...data, latitude, longitude, placeName, weatherDescription: weatherCodeToDescription(data.current_weather.weathercode) };
    console.log(output);
    return output;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Copilot prompt: Can I get the latitude and logitude of a place name in javascript?
//                 Is there a way of getting this without using an api key?

const fetchCoordinates = async (placeName) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);

      return { lat, lon }; // my addition
    } else {
      console.log('No results found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
};

// Copilot prompt: How do I get the name of the weather from the weathercode in open-meteo?
//                 Could you give me some javascript to convert the number to the text?

const weatherCodeToDescription = (code) => {
  const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };

  return weatherDescriptions[code] || 'Unknown weather code';
};

const getWeather = async (placeName) => {
  const { lat, lon } = await fetchCoordinates(placeName);
  return fetchWeatherData(lat, lon, placeName);
};

// // Example usage:
// fetchCoordinates('Rochdale, Greater Manchester');
// fetchCoordinates('Rochdale');

// // Example usage:
// fetchWeatherData(53.6177, -2.1552);

// getWeather('Istanbul');
// getWeather('Rochdale, Greater Manchester');
// getWeather('Cairo, Egypt');
// getWeather('Paris, Texas');
