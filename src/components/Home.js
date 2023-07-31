import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MovieComponent from "./MovieComponent";
import MovieInfoComponent from "./MovieInfoComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import SignUp from "./components/SignUp";
// import LogIn from "./components/Login";

export const API_KEY = "4714ddef";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const App = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  useEffect(() => {
    fetchData("");
  }, []);

  const fetchData = async (searchString) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchString}&type=movie&apikey=${API_KEY}`
      );
      updateMovieList(response.data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const onTextChange = (event) => {
    updateSearchQuery(event.target.value);
  };

  const searchMovies = () => {
    fetchData(searchQuery);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" onClick={searchMovies} />
          <SearchInput
            placeholder="Search Movie..."
            value={searchQuery}
            onChange={onTextChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") searchMovies();
            }}
          />
        </SearchBox>
        <NavLinks>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </NavLinks>
      </Header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            // <Link to={`/movies/${movie.imdbID}`} key={index}>
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            // </Link>
          ))
        ) : (
          <Placeholder src="/movie-icon.svg" />
        )}
      </MovieListContainer>
    </Container>
  );
};

export default App;
