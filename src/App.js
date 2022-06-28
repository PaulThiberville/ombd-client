import "./App.css";
import React, { useState, useEffect } from "react";
import Film from "./Film";

function App() {
  const [text, setText] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    const localLikes = localStorage.getItem("likes");
    if (!localLikes) {
      localStorage.setItem("likes", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const getFilms = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=edc0b631&s=${text}`
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json.Search);
        setResults(json.Search);
      }
    };

    getFilms();
  }, [text]);

  return (
    <div className="App">
      <div className="search">
        <input type={"text"} onChange={(e) => setText(e.target.value)} />
      </div>
      {results?.map((result) => {
        return <Film key={result.imdbID} film={result} />;
      })}
    </div>
  );
}

export default App;
