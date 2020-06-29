import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list";

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

it(`MoviesList should render correctly`, () => {
  const tree = renderer
      .create(<MoviesList
        movies={testMovies}
        onMovieCardClick={() => {}}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
