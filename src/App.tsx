import React from "react";

import AppProvider from "./hooks"; // oq envolve todos os contextos/hooks

import SignIn from "./SignIn";
// import SignUp from "./SignUp";

import GlobalStyles from "./styles/global";

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
        {/* <SignUp /> */}
      </AppProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
