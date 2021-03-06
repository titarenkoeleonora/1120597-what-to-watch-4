import React from "react";
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import MoviesList from "../../components/movies-list/movies-list.jsx";
import GenresList from "../../components/genres-list/genres-list.jsx";
import ShowMoreButton from "../../components/show-more-button/show-more-button.jsx";
import PageFooter from "../../components/page-footer/page-footer.jsx";
import PageHeader from "../../components/page-header/page-header.jsx";
import {getMovies, getGenresList} from "../../reducer/data/selectors.js";
import {getActiveGenre, getShownMoviesCount, getIsReviewOpen} from "../../reducer/app-state/selectors.js";
import {AppStateActionCreator} from "../../reducer/actions/app-state-action-creator.js";
import {getFilteredMovies} from "../../utils.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import MovieCardButtons from "../../components/movie-card-buttons/movie-card-buttons.jsx";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import ErrorScreen from "../error-screen/error-screen.jsx";

const Main = (props) => {
  const {
    activeMovie,
    promoMovie,
    movies,
    activeGenre,
    genresList,
    shownMoviesCount,
    onGenreTabClick,
    onMovieCardClick,
    onPlayButtonClick,
    onShowMoreButtonClick,
    authorizationStatus,
  } = props;

  const filteredMovies = getFilteredMovies(movies, activeGenre, shownMoviesCount);
  const shownMovies = filteredMovies.slice(0, shownMoviesCount);

  if (!activeMovie || !promoMovie) {
    return <ErrorScreen/>;
  }

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg" style={{background: promoMovie.backgroundColor}}>
          <img src={promoMovie.bgImage} alt={promoMovie.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <PageHeader/>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoMovie.poster} alt={promoMovie.title} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoMovie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoMovie.genre}</span>
                <span className="movie-card__year">{promoMovie.date}</span>
              </p>

              <MovieCardButtons
                activeMovie={activeMovie ? activeMovie : promoMovie}
                onPlayButtonClick={onPlayButtonClick}
                authorizationStatus={authorizationStatus}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            genres={genresList}
            activeGenre={activeGenre}
            onGenreTabClick={onGenreTabClick}
          />

          <MoviesList
            movies={shownMovies}
            onMovieCardClick={onMovieCardClick}
          />
          {shownMovies.length > movies.length || shownMovies.length < filteredMovies.length &&
            <ShowMoreButton
              onShowMoreButtonClick={onShowMoreButtonClick}
            />
          }
        </section>

        <PageFooter />
      </div>
    </>
  );
};

Main.propTypes = {
  activeMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    bgImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
  promoMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    bgImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    bgImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  })).isRequired,
  activeGenre: PropTypes.string.isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  shownMoviesCount: PropTypes.number,
  onGenreTabClick: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func,
  authorizationStatus: PropTypes.string.isRequired,
  isReviewOpen: PropTypes.bool.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeGenre: getActiveGenre(state),
    movies: getMovies(state),
    shownMoviesCount: getShownMoviesCount(state),
    genresList: getGenresList(state),
    authorizationStatus: getAuthorizationStatus(state),
    isReviewOpen: getIsReviewOpen(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGenreTabClick(genre) {
    dispatch(AppStateActionCreator.resetShowMoreMovies());
    dispatch(AppStateActionCreator.getActiveGenre(genre));
  },

  onShowMoreButtonClick() {
    dispatch(AppStateActionCreator.showMoreMovies());
  },

  onReviewSubmit(movieId, review) {
    dispatch(DataOperation.postReview(movieId, review));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
