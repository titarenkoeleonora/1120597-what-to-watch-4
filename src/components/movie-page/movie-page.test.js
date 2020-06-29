import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page";

const testMovie = {
  title: `Movie title`,
  genre: `Genre`,
  date: 2020,
  poster: `image`,
  bgImage: `bg-image`
};

const testMovies = [
  {
    id: `0`,
    title: `movie title`,
    poster: `image`,
  },
  {
    id: `1`,
    title: `movie title`,
    poster: `image`,
  },
  {
    id: `2`,
    title: `movie title`,
    poster: `image`,
  },
  {
    id: `3`,
    title: `movie title`,
    poster: `image`,
  },
  {
    id: `4`,
    title: `movie title`,
    poster: `image`,
  },
  {
    id: `5`,
    title: `movie title`,
    poster: `image`,
  },
  {
    id: `6`,
    title: `movie title`,
    poster: `image`,
  },
  {
    id: `7`,
    title: `movie title`,
    poster: `image`,
  }
];

it(`Should MoviePage correctly render`, () => {
  const tree = renderer
    .create(
        <MoviePage
          movie={testMovie}
          movies={testMovies}
          onMovieCardClick={() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
