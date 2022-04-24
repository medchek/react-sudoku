import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import Root from "../components/common/Root";
import RouteLoader from "../components/common/RouteLoader";
import { store } from "../store/store";

// import Sudoko from "./Sudoko";

const Sudoko = lazy(() => import("./Sudoko"));
const Home = lazy(() => import("./home/Home"));
const NotFound = lazy(() => import("./NotFound"));

const App = () => {
  return (
    <Provider store={store}>
      <Root>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<RouteLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="play"
            element={
              <Suspense fallback={<RouteLoader />}>
                <Sudoko />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<RouteLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </Root>
    </Provider>
  );
};

export default App;
