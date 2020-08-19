import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

const intitalMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(intitalMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChanges = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        props.setMovieList([
          ...props.movieList.map((newMovie) => {
            if (newMovie.id === movie.id) {
              return movie;
            } else {
              return newMovie;
            }
          }),
        ]);
        history.push(`/movies/${id}`);
        console.log(movie);
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <section>
      <form onSubmit={onSubmit} className="friend-form">
        <label className="form-label">
          Title
          <input
            name="title"
            type="text"
            value={movie.title}
            onChange={handleChanges}
          />
        </label>
        <label className="form-label">
          Director
          <input
            name="director"
            type="text"
            value={movie.director}
            onChange={handleChanges}
          />
        </label>
        <label className="form-label">
          Metascore
          <input
            name="metascore"
            type="text"
            value={movie.metascore}
            onChange={handleChanges}
          />
        </label>
        <button className="submit">Submit</button>
      </form>
    </section>
  );
};

export default UpdateMovie;
