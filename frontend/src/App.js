// ----------------- Aayush and Subrat both did this file ------------------------

import React from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import NavBar from "./components/NavBar";
import RateProfessor from "./components/RateProfessor";

const App = () => {
  return (
    <div>
      <NavBar />
      <Heading title={"Provide feedback to the professor you want!"} />
      <Body />
      <hr />
      <Heading title={"Rate your favorite professor!"} />
      <RateProfessor />
      <hr />
      <Footer />
    </div>
  );
};

export default App;
