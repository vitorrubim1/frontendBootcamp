import React from "react";

import { AuthProvider } from "./context/AuthContext";

import GlobalStyles from "./styles/global";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
        <SignUp />
      </AuthProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
