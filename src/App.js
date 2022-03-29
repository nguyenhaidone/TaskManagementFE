import "./App.scss";
import React from "react";
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";
import Login from "components/Login/Login";
import Register from "components/Register/Register";

const App = () => {
  return (
    <div className="App">
      {/* <AppBar/>
      <BoardBar/>
      <BoardContent/>
      <Login/> */}
      <Register />
    </div>
  );
};

export default React.memo(App);
