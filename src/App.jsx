import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const api_key = "71847e2b068a8b60b15e51f4df8db223"

function App() {
  const [search, setSearch] = useState("");

    const submitForm = async(e) => {
      e.preventDefault();
      try {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`;

        const response = await axios.get(API_URL);
        const data = response.data;
        console.log(data);
      } catch (err) {
        console.error(err.message);
      }
    }

  
  return (
    <>
      <div className="flex-container">
        <div className="flex-item">
          <div className = "input-container">
          <form onSubmit= {submitForm}>
            <input
              className="search"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn" type="submit">Search</button>
          </form>
          </div>
        </div>
        <div className="flex-item"></div>
      </div>
    </>
  );
}

export default App;
