import React from "react";

import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";

const AppProvider: React.FC = ({ children }) => {
  // children: é oq envolveremos, as pág por exemplo
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
