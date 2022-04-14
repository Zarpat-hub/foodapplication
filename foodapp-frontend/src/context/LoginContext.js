import { createContext } from "react";

export const User = {
  name: "",
  role: "",
};

export const LoginContext = createContext(User);
