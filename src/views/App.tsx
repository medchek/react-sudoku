import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import Root from "../components/common/Root";
import { store } from "../store/store";
// import Sudoko from "./Sudoko";

const Sudoko = lazy(() => import("./Sudoko"));
const Home = lazy(() => import("./home/Home"));

const App = () => {
  return (
    <Provider store={store}>
      <Root>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={"Loading..."}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="play"
            element={
              <Suspense fallback={"Loading..."}>
                <Sudoko />
              </Suspense>
            }
          />
        </Routes>
      </Root>
    </Provider>
  );
};

export default App;
