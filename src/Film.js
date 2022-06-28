import React, { useState, useEffect } from "react";
import "./App.css";

function Film({ film }) {
  const [like, setLike] = useState(false);
  const localLikes = JSON.parse(localStorage.getItem("likes"));

  useEffect(() => {
    setLike(localLikes.includes(film.imdbID));
  }, []);

  const handleLike = () => {
    if (localLikes.includes(film.imdbID)) {
      const newLikes = localLikes.filter((like) => {
        return like !== film.imdbID;
      });
      localStorage.setItem("likes", JSON.stringify(newLikes));
      setLike(false);
      return;
    }
    localStorage.setItem("likes", JSON.stringify([...localLikes, film.imdbID]));
    setLike(true);
  };

  return (
    <div className={"film"}>
      <h2>{film.Title}</h2>
      <p>{film.Year}</p>
      <img src={film.Poster} alt={film.Title}></img>
      <button className="like" onClick={() => handleLike()}>
        {like === true ? "unlike" : "like"}
      </button>
    </div>
  );
}

export default Film;
