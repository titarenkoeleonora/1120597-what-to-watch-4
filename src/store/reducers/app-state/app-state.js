import {extend} from "../utils";
import {MAX_SHOWN_MOVIES, emptyMovie} from "../../../constants";
import {ActionType} from "../../actions/action-types";

const initialState = {
  activeGenre: `All genres`,
  activeMovie: emptyMovie,
  shownMoviesCount: MAX_SHOWN_MOVIES,
  isMovieVideoplayerActive: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ACTIVE_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });
    case ActionType.SHOW_MORE_MOVIES:
      return extend(state, {
        shownMoviesCount: state.shownMoviesCount + action.payload,
      });
    case ActionType.ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: action.payload,
      });
    case ActionType.ACTIVATE_MOVIE_VIDEOPLAYER:
      return extend(state, {
        isMovieVideoplayerActive: action.payload,
      });
  }

  return state;
};

export {reducer, initialState};
