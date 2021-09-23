import {
    createStore,
    applyMiddleware,
    combineReducers
} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from "./modules/auth/reducer";
import user from "./modules/user/reducer";
import sidebar from "./modules/sidebar/reducer";
import places from "./modules/places";
import cities from "./modules/cities";
import districts from "./modules/districts";
import movies from "./modules/movies";
import performances from "./modules/performances";
import placeTypes from "./modules/placeTypes";
import users from "./modules/users";
import settings from "./modules/settings";
import materials from "./modules/materials";
import events from "./modules/events";
import sections from "./modules/sections";
import tags from "./modules/tags";
import books from "./modules/books";
import celebrities from "./modules/celebrities";
import { reducer as toastr } from "react-redux-toastr";

const store = createStore(
    combineReducers({
        auth,
        user,
        sidebar,
        settings,
        materials,
        events,
        sections,
        places,
        cities,
        districts,
        movies,
        performances,
        placeTypes,
        users,
        toastr,
        tags,
        books,
        celebrities
    }),
    composeWithDevTools(
      applyMiddleware(thunk)
    )
);

export default store;
