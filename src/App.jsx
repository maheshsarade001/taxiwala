import React from "react";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
