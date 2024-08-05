import { useState } from "react";
import axios from "axios";
import "./App.css";
import { api_key } from "./api";

function App() {
  const [search, setSearch] = useState(""); // city
  const [state, setState] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [infoError, setInfoError] = useState("");
  const [forecast, setForecast] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search},${state},${"USA"}&appid=${api_key}`;
      const response = await axios.get(API_URL);
      setData(response.data);
      console.log(response.data);

      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${search},${state},${"USA"}&appid=${api_key}`;
      const forecastResponse = await axios.get(forecastURL);
      setForecast(forecastResponse.data);
      console.log(forecastResponse.data);
    } catch (err) {
      console.error(err.message);
      setData(null);
      setError("*City Not Found*");
      setInfoError("");
    }
  };

  const convertTemp = (kelvin) => {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(0);
  };

  const getNextDays = (n) => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i + 1);
      days.push(nextDate.toLocaleDateString("en-US", { weekday: "short" }));
    }
    return days;
  };

  const nextFiveDays = getNextDays(5);

  return (
    <div className="flex-container">
      <div className="flex-item">
        <form onSubmit={submitForm}>
          <select
            className="state-drop"
            onChange={(e) => setState(e.target.value)}
            value={state}
          >
            <option value="">State</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
          <input
            className="search"
            type="search"
            placeholder="City"
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
                {data ? <span>{data.main.humidity}%</span> : infoError}
              </h5>
            </div>
            <div className="info-item">
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
            </div>
          </div>
          <div className="week">
            <div className="three-hr">
              <h3>Three Hour Forecast</h3>
              <div className="three-hr-container">
                {forecast &&
                  forecast.list.slice(0, 4).map((entry, index) => (
                    <div className="hour" key={index}>
                      <p>
                        {new Date(entry.dt * 1000).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>{convertTemp(entry.main.temp)}°</p>
                      <p>{entry.weather[0].description}</p>
                      {entry.weather[0].description === "clear sky" ? (
                        <div class="sun">
                        <div class="center"></div>
                        <div class="ray r-1"></div>
                        <div class="ray r-2"></div>
                        <div class="ray r-3"></div>
                        <div class="ray r-4"></div>
                        <div class="ray r-5"></div>
                        <div class="ray r-6"></div>
                        <div class="ray r-7"></div>
                        <div class="ray r-8"></div>
                      </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
            <div className="daily">
              <h3>Daily Forecast</h3>
              <div className="daily-container">
                {forecast &&
                  nextFiveDays.map((day, index) => (
                    <div className="day" key={index}>
                      <p>{day}</p>
                      <p>
                        {forecast ? (
                          <span>
                            {forecast.list[index * 8].dt_txt.split(" ")[0]}
                          </span>
                        ) : (
                          infoError
                        )}
                      </p>
                      <p>
                        {forecast ? (
                          <span>
                            {convertTemp(forecast.list[index * 8].main.temp)}°
                          </span>
                        ) : (
                          infoError
                        )}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
