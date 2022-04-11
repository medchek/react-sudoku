import React, { lazy, Suspense } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
// import Sudoko from "./Sudoko";

const Sudoko = lazy(() => import("./Sudoko"));
const Home = lazy(() => import("./Home"));

const App = () => {
  return (
    <Provider store={store}>
      <div className="h-screen max-h-screen min-h-screen w-screen overflow-hidden">
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
      </div>
    </Provider>
  );
};

export default App;
