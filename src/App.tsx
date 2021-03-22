import React from "react";

import { AuthProvider } from "./hooks/AuthContext";

import GlobalStyles from "./styles/global";

import ToastContainer from "./components/ToastContainer";

import SignIn from "./SignIn";
// import SignUp from "./SignUp";

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
        {/* <SignUp /> */}
      </AuthProvider>
      <ToastContainer />
      <GlobalStyles />
    </>
  );
};

export default App;
