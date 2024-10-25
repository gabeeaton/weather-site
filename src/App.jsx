import { useState, useEffect } from "react";
import "./App.css";
import "chart.js/auto";
import { LineGraph, DoughnutGauge, BarChart } from "./charts";
import { fetchWeatherData, fetchForecastData } from "./fetchAPI";

const convertTemp = (kelvin) => {
  return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(0);
};

function App() {
  const [search, setSearch] = useState("");//city
  const [state, setState] = useState("");//state
  const [data, setData] = useState("");//data returned from API for current day
  const [error, setError] = useState(null);//error
  const [infoError, setInfoError] = useState("");//error if city is not found
  const [forecast, setForecast] = useState("");//forecast for future
  const [videoSrc, setVideoSrc] = useState('');//source of video
  const [videoKey, setVideoKey] = useState(Date.now());//key to identify video

  useEffect(() => {//use effect to change video background depending on current weather
    if (data) {
      const description = data.weather[0].description.toLowerCase();
      let newVideoSrc = '';
      if (description.includes('clear') || !description || description === undefined) {
        newVideoSrc =  "/assets/Clear.mp4"
      } else if (description.includes('clouds')) {
        newVideoSrc = '/assets/clouds.mp4';
      } else if (description.includes('rain')) {
        newVideoSrc = '/assets/rain.mp4';
      } else if (description.includes('snow')) {
        newVideoSrc = '/assets/snow.mp4';
      } else if (description.includes('thunderstorm')) {
        newVideoSrc = '/assets/thunder.mp4';
      } else {
        newVideoSrc = '/assets/Clear.mp4';
      }
      setVideoSrc(newVideoSrc);//sets the video source from the else if
      setVideoKey(Date.now()); // Update key to force re-render
    }
  }, [data]);//dependency that changes everytime data is updated

  useEffect(() => {
    const defaultVid = '/assets/clear.mp4';
    setVideoSrc(defaultVid);//sets the video source from the else if
    setVideoKey(Date.now());
  }, []);

  const submitForm = async (e) => {//function to call api and submit form on submit
    e.preventDefault();
    if (!search || !state) {//ensures both city and state parameters are entered
      setError("*Please enter both a city and state*");
      setData(null);
      setForecast(null);
      return;
    }
    try {
      const response = await fetchWeatherData(search, state);
      setData(response);
      console.log(response);

      const forecastResponse = await fetchForecastData(search, state);
      setForecast(forecastResponse);
    } catch (err) {
      console.error(err.message);
      setData(null);
      setError("*City Not Found*");
      setInfoError("");
    }
  };

  const getNextDays = (n) => {//gets days of the week for forecast
    const days = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i + 1);
      days.push(nextDate.toLocaleDateString("en-US", { weekday: "long" }));
    }
    return days;
  };

  const nextFiveDays = getNextDays(5);//sets number of days to get

  return (
    <div className="flex-container">
      <div className="flex-item">
        <form onSubmit={submitForm}>{/*submits form on submit*/}
          <select
            className="state-drop"
            onChange={(e) => setState(e.target.value)} //sets the state parameter to the current value in dropdown
            value={state}
          >
            <option value="">State</option>{/*dropdown to select state location*/}
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
          />{/*search bar*/}
          <button className="search-btn" type="submit">{/*serach button*/}
            Search
          </button>
        </form>
        <div className="temp-container">
          <div className="name">{/*conditionally renders temperature if data is passed*/}
            <h3>{data ? <span>{data.name}</span> : null}</h3>
          </div>
          <h1 className="main-temp">
            {data ? <span>{convertTemp(data.main.temp)}° F</span> : error}
          </h1>
          <div className="desc-main">
            <h5 className="main-desc">
              {data ? (
                <span>
                  {data.weather[0].description
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              ) : null}
            </h5>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-item item1">{/*conditionally renders 5 day forecast if data is passed*/}
            {forecast &&
              nextFiveDays.map((day, index) => (//maps the days to an array
                <div className="day" key={index}>
                  <div className="day-info">
                    <p>{day}</p>
                  </div>
                  <div className="temp"> {/*renders the icon matching the description*/}
                    {forecast.list[index * 8].weather[0].description ===
                      "clear sky" ? (
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
                      </>
                    ) : forecast.list[
                      index * 8
                    ].weather[0].description.includes("clouds") ? (
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
                      </>
                    ) : forecast.list[
                      index * 8
                    ].weather[0].description.includes("rain") ? (
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
                    ) : forecast.list[
                      index * 8
                    ].weather[0].description.includes("thunderstorm") ? (
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
                    ) : forecast.list[
                      index * 8
                    ].weather[0].description.includes("snow") ? (
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
                </div>
              ))}
          </div>
          <div className="grid-item item7">
            {" "}
            {data ? ( /*wind info*/
              <div className="wind">
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
                <h6 className="temp-text title wind-title">Wind</h6>
              </div>
            ) : null}
            {data ? (
              <div className="wind-val">
                <h3>{data.wind.deg}°</h3>
                <h3>{(data.wind.speed * 2.23694).toFixed(1)} mph</h3>
              </div>
            ) : (
              infoError
            )}
          </div>
          <div className="grid-item item3">
            <div className="graph">{/*graph for 3 hour forecast for the next 12 hours*/}
              <LineGraph forecastData={forecast} />
            </div>
          </div>
          <div className="grid-item item6">
            {" "}
            {data ? (
              <div className="temp-section">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="red"
                  className="bi bi-thermometer-half"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                </svg>
                <h6 className="temp-text title bar-title">Temperature</h6>
              </div>
            ) : null}
            <div className="bar-container">
              <div className="bar">
                <BarChart temps={data} />{/*Bar chart that shows high, low, and feels like*/}
              </div>
            </div>
          </div>

          <div className="grid-item item2">
            {data ? (
              <div className="title">
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
                <h6 className="temp-text title">Humidity</h6>
              </div>
            ) : null}
            <div className="humid">
              {" "}
              <div className="humid-value">
                {data ? <span>{data.main.humidity}%</span> : infoError}
                <div>
                  <DoughnutGauge humidity={data} />{/*doughnut that displays humidity*/}
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item item4">{/*renders pressure info*/}
            {data ? (
              <div className="pressure-section">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25 "
                  fill="#90EE90"
                  className="bi bi-speedometer"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                  <path
                    fillRule="evenodd"
                    d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"
                  />
                </svg>
                <h6 className="temp-text title">Pressure</h6>
              </div>
            ) : null}
            <div className="pressure-value">
              {data ? <h3>{data.main.pressure} mb</h3> : infoError}
            </div>
          </div>
        </div>

        <div>
          {videoSrc && (
            <video key={videoKey} autoPlay muted loop className="background-video">{/*displays video*/}
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );

}

export const lineGraphData = (forecastResponse) => {
  {/*passes line graph data*/ }
  if (forecastResponse) {
    return {
      labels: forecastResponse.list.slice(0, 13).map((entry) =>
        new Date(entry.dt * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      ),
      datasets: [
        {
          data: forecastResponse.list
            .slice(0, 13)
            .map((entry) => convertTemp(entry.main.temp)),
        },
      ],
    };
  }
};

export const DoughnutData = (humidity) => {
  {/*passes donut data*/ }
  if (humidity) {
    return {
      labels: ["Humidity"],
      datasets: [
        {
          data: [humidity.main.humidity, 100 - humidity.main.humidity],
          backgroundColor: [
            "rgba(100, 149, 237, 0.75)",
            "rgba(201, 203, 207, 0.75)",
          ],
          borderWidth: 0,
        },
      ],
    };
  }
};

export const BarData = (temp) => {
  {/*passes bar graph data*/ }
  if (temp) {
    return {
      labels: ["High", "Low", "Feels Like"],
      datasets: [
        {
          data: [
            convertTemp(temp.main.temp_max),
            convertTemp(temp.main.temp_min),
            convertTemp(temp.main.feels_like),
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(159, 90, 253, 0.6)",
          ],
        },
      ],
    };
  }
};

export default App;
