import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./App.css";
import { httpServer } from "./services/httpService";

import Header from "./components/Header";
import TableComponent from "./components/TableComponent";
import AddMovieButton from "./components/AddMovieButton";
import SearchComponent from "./components/SearchComponent";
import AddMovieForm from "./components/AddMovieForm";
import UpdateMovieForm from "./components/UpdateMovieForm";

class App extends Component {
  state = {
    movies: [],
    noMovies: false,
    movieToUpdate: "",
    redirectToMovies: false,
    disableDeleteButton: false,
    searchedArray: [],
  };

  // ///////////////////////////////////
  // start to check database for movies
  async componentDidMount() {
    console.log(httpServer);
    const { data: dbMovies } = await axios.get(httpServer);

    if (dbMovies.length === 1) {
      this.setState({ disableDeleteButton: true });
    }

    this.setState({ movies: dbMovies });
  }

  // ///////////////////////////////////////////////
  // handleSearch
  handleSearch = (e) => {
    const movies = [...this.state.movies];

    const searchValue = e.currentTarget.value;

    const searchedArray = movies.filter((movie) =>
      movie.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    const notSearchedArray = movies.filter(
      (movie) => !movie.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    const sortedMovies = [...searchedArray, ...notSearchedArray];

    if (searchedArray.length === 0 && searchValue.length > 0) {
      return this.setState({ noMovies: true });
    }

    if (searchValue.length === 0) {
      window.location = "/movies";
    }

    return this.setState({
      movies: sortedMovies,
      noMovies: false,
      searchedArray,
    });
  };

  // //////////////////////////////////////////////
  // handleDelete
  handleDelete = ({ _id: id }) => {
    axios
      .delete(httpServer + id)
      .then((result) => {
        const movies = this.state.movies.filter((movie) => movie._id !== id);
        this.setState({ movies });

        if (this.state.movies.length === 1) {
          this.setState({ disableDeleteButton: true });
        }
        toast.warning("Movie DELETED from database!");
        return;
      })
      .catch((err) => console.log("Delete Error ", err));
  };

  // ///////////////////////////////////////////////
  // handleUpdateButton
  handleUpdateButton = (id) => {
    const movies = [...this.state.movies];
    const movieToUpdate = movies.filter((movie) => movie._id === id);

    this.setState({
      movieToUpdate,
      redirectToMovies: false,
    });
  };

  // addMovieButton
  handleAddMovieButton = () => {
    this.setState({
      redirectToMovies: false,
    });
  };

  // doSubmitAddMovieForm
  doSubmitAddMovieForm = (addMovieData) => {
    axios
      .post(httpServer + "add", addMovieData)
      .then((movie) => {
        const movies = [...this.state.movies, movie.data];
        this.setState({
          movies,
          disableDeleteButton: false,
        });

        toast.success("Movie ADDED to database!");

        setTimeout(() => this.setState({ redirectToMovies: true }), 1300);

        return;
      })
      .catch((err) => console.log(err.message));
  };

  // ////////////////////////////////////////////
  // doSubmitUpdateMovieForm
  doSubmitUpdateMovieForm = (updatedMovie) => {
    const id = this.state.movieToUpdate[0]._id;

    axios
      .put(httpServer + "update/" + id, updatedMovie)
      .then((movie) => console.log(movie))
      .catch((err) => console.log("Update Error", err));
    const moviesArray = [...this.state.movies];
    const updatedMoviesArray = moviesArray.map((movie) => {
      if (movie._id === id) {
        movie.name = updatedMovie.name;
        movie.genre = updatedMovie.genre;
        movie.rate = updatedMovie.rate;
      }
      return movie;
    });
    this.setState({ movies: updatedMoviesArray });
    toast.info("Movie UPDATED in database!");

    setTimeout(() => this.setState({ redirectToMovies: true }), 1300);
  };

  render() {
    const {
      movies,
      noMovies,
      redirectToMovies,
      disableDeleteButton,
      searchedArray,
    } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <ToastContainer autoClose={1200} />
          <Route path="/movies" exact component={Header} />
          <Route
            path="/movies"
            exact
            render={(props) => (
              <SearchComponent
                {...props}
                movies={movies}
                onSearch={this.handleSearch}
                noMovies={noMovies}
              />
            )}
          />
          <Route
            path="/movies"
            exact
            render={(props) => (
              <TableComponent
                {...props}
                movies={movies}
                onUpdate={this.handleUpdateButton}
                noMovies={noMovies}
                disableDeleteButton={disableDeleteButton}
                onDelete={this.handleDelete}
                searchedArray={searchedArray}
              />
            )}
          />
          <Route
            path="/movies"
            exact
            render={() => (
              <AddMovieButton
                handleAddMovieButton={this.handleAddMovieButton}
              />
            )}
          />
          <Route
            path="/movies/add"
            render={(props) => (
              <AddMovieForm
                {...props}
                redirectToMovies={redirectToMovies}
                doSubmitAddMovieForm={this.doSubmitAddMovieForm}
              />
            )}
          />
          <Route
            path="/movies/update"
            render={(props) => (
              <UpdateMovieForm
                {...props}
                movieToUpdate={this.state.movieToUpdate}
                doSubmitUpdateMovieForm={this.doSubmitUpdateMovieForm}
                redirectToMovies={redirectToMovies}
              />
            )}
          />
          <Redirect to="/movies" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
