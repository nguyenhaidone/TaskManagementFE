import "./App.scss";
import React from "react";
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";

const App = () => {

  return (
    <div className="App">
      <AppBar/>
      <BoardBar/>
      <BoardContent/>
    </div>
  );
};

export default React.memo(App);
