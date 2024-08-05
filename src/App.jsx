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
              <div className="center">
                <h6 className="temp-text title">Temperature</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="white"
                  className="bi bi-thermometer-half"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                </svg>
              </div>
              <h5 className="temp-text">
                {data ? (
                  <span>H: {convertTemp(data.main.temp_max)}° </span>
                ) : (
                  infoError
                )}
              </h5>
              <h5 className="temp-text">
                {data ? (
                  <span>L: {convertTemp(data.main.temp_min)}° </span>
                ) : (
                  infoError
                )}
              </h5>
              <h5 className="temp-text">
                {data ? (
                  <span>Feels Like: {convertTemp(data.main.feels_like)}°</span>
                ) : (
                  infoError
                )}
              </h5>
            </div>
            <div className="info-item">
              <div className="center">
                <h6 className="temp-text title">Humidity</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#6495ED"
                  className="bi bi-droplet-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13" />
                </svg>
              </div>
              <h5 className="temp-text">
                {data ? <span>{data.main.humidity}%</span> : infoError}
              </h5>
            </div>
            <div className="info-item">
              <div className="center">
                <h6 className="temp-text title">Weather</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="green"
                  className="bi bi-tropical-storm"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                  <path d="M9.5 2c-.9 0-1.75.216-2.501.6A5 5 0 0 1 13 7.5a6.5 6.5 0 1 1-13 0 .5.5 0 0 1 1 0 5.5 5.5 0 0 0 8.001 4.9A5 5 0 0 1 3 7.5a6.5 6.5 0 0 1 13 0 .5.5 0 0 1-1 0A5.5 5.5 0 0 0 9.5 2M8 3.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8" />
                </svg>
              </div>
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
              <div className="center">
                <h6 className="temp-text title">Wind</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#00FFFF"
                  className="bi bi-wind"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                </svg>
              </div>
              <h5 className="temp-text">
                {data ? (
                  <span>
                    Speed: {(data.wind.speed * 2.23694).toFixed(1)} mph
                  </span>
                ) : (
                  infoError
                )}
              </h5>
              <h5 className="temp-text">
                {data ? <span>Degrees: {data.wind.deg}°</span> : infoError}
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
                      {entry.weather[0].description == "clear sky" ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="27"
                            fill="yellow"
                            className="bi bi-brightness-high-fill weather-icon"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                          </svg>
                          {/* { <video
                            autoPlay
                            muted
                            loop
                            className="background-video"
                          >
                            <source
                              src="../src/assets/854002-hd_1920_1080_24fps.mp4"
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>} */}
                        </>
                      ) : entry.weather[0].description.includes("clouds") ? (
                        <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="27"
                          fill="currentColor"
                          className="bi bi-cloud-fill weather-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
                        </svg>
                        {/* {<video
                        autoPlay
                        muted
                        loop
                        className="background-video"
                      >
                        <source
                          src="../src/assets/854002-hd_1920_1080_24fps.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video> } */}
                      </>
                      ) : entry.weather[0].description.includes("rain") ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="27"
                          fill="currentColor"
                          className="bi bi-cloud-rain weather-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2" />
                        </svg>
                      ) : entry.weather[0].description.includes(
                          "thunderstorm"
                        ) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="27"
                          fill="currentColor"
                          className="bi bi-cloud-lightning weather-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.405 4.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973M8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 1M7.053 11.276A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724z" />
                        </svg>
                      ) : entry.weather[0].description.includes("snow") ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="27"
                          fill="currentColor"
                          className="bi bi-cloud-snow weather-icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.405 4.277a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973M8.5 1.25a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1-.001 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 1.25M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m2.75 2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-2.75-2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25" />
                        </svg>
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
