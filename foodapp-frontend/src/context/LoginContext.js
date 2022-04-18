import { createContext } from "react";

export const User = {
  id: "",
  name: "",
  role: "",
  email: "",
  token: "",
};

export const LoginContext = createContext(User);
