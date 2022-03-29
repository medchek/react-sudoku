import React from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Sudoko from "./Sudoko";

const App = () => {
  return (
    <Provider store={store}>
      <div className="h-screen max-h-screen min-h-screen w-screen overflow-hidden">
        <Sudoko />
      </div>
    </Provider>
  );
};

export default App;
