import React from "react";

import GlobalStyles from "./styles/global";

import Signin from "./Signin";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Signin />
    </>
  );
};

export default App;
