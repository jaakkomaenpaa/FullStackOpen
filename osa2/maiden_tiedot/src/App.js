import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl =
  "https://restcountries.com/v3.1/all?fields=name,flags,languages,capital,area,latlng";

const APIKey = process.env.REACT_APP_API_KEY;

const getWeather = (lat, lon) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  return axios
    .get(weatherUrl)
    .then((response) => {
      const temperature = (response.data.main.temp - 273.15).toFixed(2);
      const wind = response.data.wind.speed;
      const weatherIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
      return [temperature, wind, weatherIcon];
    })
    .catch((error) => {
      console.log("Error while fetching weather data", error);
      return [0, 0, ""];
    });
};

const getCountryStats = (country) => {
  return {
    name: country.name.common,
    capital: country.capital,
    area: country.area,
    languages: country.languages,
    flag: country.flags.png,
    latlng: country.latlng,
  };
};

const Weather = ({ capital, latlng }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    getWeather(latlng[0], latlng[1])
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [latlng]);

  const temp = weatherData[0];
  const wind = weatherData[1];
  const icon = weatherData[2];

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>temperature {temp} Celsius</div>
      <Icon image={icon} />
      <div>wind {wind} m/s</div>
    </div>
  );
};

const Icon = ({ image }) => {
  return <img className="weather-icon" src={image} alt="weather-icon" />;
};

const Flag = ({ image }) => {
  return <img className="flag-icon" src={image} alt="flag" />;
};

const Languages = ({ languages }) => {
  const languageArray = Object.values(languages);
  return languageArray.map((language) => {
    return <li key={language}>{language}</li>;
  });
};

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <Flag image={country.flag} />
      <Weather capital={country.capital[0]} latlng={country.latlng} />
    </div>
  );
};

const Countries = ({ countries, filter, showFunc, show, countryToShow }) => {
  const matchingCountries = countries.filter((country) =>
    country.name.common.toUpperCase().includes(filter.toUpperCase())
  );
  if (matchingCountries.length === 1) {
    const countryStats = getCountryStats(matchingCountries[0]);
    return (
      <div>
        <Country country={countryStats} />
      </div>
    );
  } else if (show) {
    return (
      <div>
        <Country country={countryToShow} />
      </div>
    );
  } else if (matchingCountries.length > 10) {
    return <div>Too many countries, specify another filter</div>;
  } else {
    return countries
      .filter((country) =>
        country.name.common.toUpperCase().includes(filter.toUpperCase())
      )
      .map((country) => {
        const countryStats = getCountryStats(country);
        return (
          <div key={country.name.official}>
            {country.name.common}
            <button
              key={country.name.official}
              onClick={() => showFunc(countryStats)}
            >
              show
            </button>
          </div>
        );
      });
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showState, setShowState] = useState(false);
  const [countryToShow, setCountryToShow] = useState(null);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const setNewFilter = (event) => {
    setFilter(event.target.value);
    setShowState(false);
  };

  const showCountry = (country) => {
    setShowState(true);
    setCountryToShow(country);
  };

  return (
    <div>
      find countries
      <input onChange={setNewFilter} />
      <Countries
        countries={countries}
        filter={filter}
        showFunc={showCountry}
        show={showState}
        countryToShow={countryToShow}
      />
    </div>
  );
};

export default App;
