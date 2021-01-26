import React from "react";

import GlobalStyles from "./styles/global";

// import SignIn from "./SignIn";
import SignUp from "./SignUp";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      {/* <SignIn /> */}
      <SignUp />
    </>
  );
};

export default App;
