import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { api_key } from "./api";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [infoError, setInfoError] = useState("");
  const [forecast, setForecast] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`;
      const response = await axios.get(API_URL);
      setData(response.data);

      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${api_key}`;
      const forecastResponse = await axios.get(forecastURL);
      setForecast(forecastResponse.data);

      console.log(forecastResponse.data);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
      setData(null);
      setError("City Not Found");
      setInfoError("");
    }
  };
  const convertTemp = (kelvin) => {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(0);
  };
  return (
    <>
      <div className="flex-container">
        <div className="flex-item">
          <form onSubmit={submitForm}>
            <input
              className="search"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn" type="submit">
              Search
            </button>
          </form>
          <div className="temp-container">
            <h1 className="main-temp">
              {data ? <span>{convertTemp(data.main.temp)}°</span> : error}
            </h1>
          </div>
          <div className="info-container">
            <div className="info">
              <div className="info-item">
                <h6 className="temp-text">Temperature</h6>
                <h5 className="temp-text">
                  H:{" "}
                  {data ? (
                    <span>{convertTemp(data.main.temp_max)}° </span>
                  ) : (
                    infoError
                  )}
                </h5>
                <h5 className="temp-text">
                  L:{" "}
                  {data ? (
                    <span>{convertTemp(data.main.temp_min)}° </span>
                  ) : (
                    infoError
                  )}
                </h5>
                <h5 className="temp-text">
                  Feels Like:{" "}
                  {data ? (
                    <span>{convertTemp(data.main.feels_like)}°</span>
                  ) : (
                    infoError
                  )}
                </h5>
              </div>
              <div className="info-item">
                <h6 className="temp-text">Humidity</h6>
                <h5 className="temp-text">
                  {" "}
                  {data ? <span>{data.main.humidity}%</span> : infoError}
                </h5>
              </div>
              <div className="info-item">
                {" "}
                <h6 className="temp-text">Weather</h6>
                <h5 className="temp-text">
                  {data ? (
                    <span>
                      {data.weather[0].main}: {data.weather[0].description}
                    </span>
                  ) : (
                    infoError
                  )}
                </h5>
              </div>
              <div className="info-item">
                <h6 className="temp-text">Wind</h6>
                <h5 className="temp-text">
                  Speed:{" "}
                  {data ? (
                    <span>{(data.wind.speed * 2.23694).toFixed(1)} mph</span>
                  ) : (
                    infoError
                  )}
                </h5>
                <h5 className="temp-text">
                  Degrees: {data ? <span>{data.wind.deg}°</span> : infoError}
                </h5>
                <h5 className="temp-text">
                  Gust:{" "}
                  {data ? (
                    <span>{(data.wind.gust * 2.23694).toFixed(1)}mph</span>
                  ) : (
                    infoError
                  )}
                </h5>
              </div>
            </div>
            <div className="week">
              <div className="three-hr">
                <h3>Three Hour Forecast</h3>
                <div className="three-hr-container">
                  <div className="hour"></div>
                  <div className="hour"></div>
                  <div className="hour"></div>
                  <div className="hour"></div>
                  <div className="hour"></div>
                </div>
              </div>
              <div className="daily">
                <h3>Daily Forecast</h3>
                <div className="daily-container">
                  <div className="day">
                    <p>Mon</p>
                    <p>
                      {forecast ? (
                        <span>{forecast.list[3].dt_txt.split(" ")[0]}</span>
                      ) : (
                        infoError
                      )}
                    </p>
                    <p>
                      {forecast ? (
                        <span>{convertTemp(forecast.list[3].main.temp)}°</span>
                      ) : (
                        infoError
                      )}
                    </p>
                  </div>
                  <div className="day">
                    <p>Tues</p>
                    <p>
                      {forecast ? (
                        <span>{forecast.list[11].dt_txt.split(" ")[0]}</span>
                      ) : (
                        infoError
                      )}
                    </p>
                    <p>
                      {forecast ? (
                        <span>{convertTemp(forecast.list[11].main.temp)}°</span>
                      ) : (
                        infoError
                      )}
                    </p>
                  </div>
                  <div className="day">
                    <p>Wed</p>
                    <p>
                      {forecast ? (
                        <span>{forecast.list[19].dt_txt.split(" ")[0]}</span>
                      ) : (
                        infoError
                      )}
                    </p>
                    <p>
                      {forecast ? (
                        <span>{convertTemp(forecast.list[19].main.temp)}°</span>
                      ) : (
                        infoError
                      )}
                    </p>
                  </div>
                  <div className="day">
                    <p>Thurs</p>
                    <p>
                      {forecast ? (
                        <span>{forecast.list[27].dt_txt.split(" ")[0]}</span>
                      ) : (
                        infoError
                      )}
                    </p>
                    <p>
                      {forecast ? (
                        <span>{convertTemp(forecast.list[27].main.temp)}°</span>
                      ) : (
                        infoError
                      )}
                    </p>
                  </div>
                  <div className="day">
                    <p>Fri</p>
                    <p>
                      {forecast ? (
                        <span>{forecast.list[35].dt_txt.split(" ")[0]}</span>
                      ) : (
                        infoError
                      )}
                    </p>
                    <p>
                      {forecast ? (
                        <span>{convertTemp(forecast.list[35].main.temp)}°</span>
                      ) : (
                        infoError
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
