import React from "react";
import "./App.css";
import Header from "./components/Header";
import Forex from "./components/Forex";

function App() {
  return (
    <>
      <div className="main_component">
        <Header />
        <Forex />
      </div>
    </>
  );
}

export default App;
