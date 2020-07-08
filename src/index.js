import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {Movie} from "./constants.js";
import {movies} from "./mocks/movies.js";
import reviews from './mocks/reviews';
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./reducer.js";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App
        movie={Movie}
        movies={movies}
        reviews={reviews}
      />
    </Provider>,

    document.querySelector(`#root`)
);
