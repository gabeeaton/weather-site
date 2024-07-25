import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { api_key } from "./api";


function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

    const submitForm = async (e) => {
      e.preventDefault();
      try {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`;
        const response = await axios.get(API_URL);
          setData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    }

    useEffect(() => {
      if(data) {
        setData(data);
      }
    }, [data]);
  return (
    <>
      <div className="flex-container">
        <div className="flex-item">
          <form onSubmit= {submitForm}>
            <input
              className="search"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn" type="submit">Search</button>
          </form>
          <h1>{data.main.hints}</h1>
        </div>
      </div>
    </>
  );
}

export default App;
