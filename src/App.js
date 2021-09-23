import React from "react";
import store from "@app/redux";

import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import Routes from "@app/routes/Routes";
import AppLoader from "@components/AppLoader";

const App = () => (
  <Provider store={store}>
    <AppLoader>
      <Routes />
    </AppLoader>
    <ReduxToastr
      timeOut={5000}
      newestOnTop={true}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>
);

export default App;
