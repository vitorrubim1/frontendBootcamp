import React from "react";

import GlobalStyles from "./styles/global";

import Signin from "./Signin";
import Signup from "./Signup";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      {/* <Signin /> */}
      <Signup />
    </>
  );
};

export default App;
