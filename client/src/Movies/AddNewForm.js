import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};
function AddNewForm(props) {
  const history = useHistory();
  const [movie, setMovie] = useState(initialMovie);
  const { setMovieList } = props;

  const onChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const addMovie = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", movie)
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/");
  };

  return (
    <div className="movie-card">
      <form onSubmit={addMovie}>
        <input
          type="text"
          name="title"
          onChange={onChange}
          value={movie.title}
          placeholder="title"
        />
        <input
          className="movie-director"
          type="text"
          name="director"
          onChange={onChange}
          value={movie.director}
          placeholder="director"
        />
        <input
          className="movie-metascore"
          type="text"
          name="metascore"
          onChange={onChange}
          value={movie.metascore}
          placeholder="metascore"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
export default AddNewForm;
