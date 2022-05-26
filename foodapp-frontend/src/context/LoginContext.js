import { createContext } from "react";

export const User = {
  id: "",
  name: "",
  role: "",
  email: "",
  balance: "",
  token: "",
};

export const LoginContext = createContext(User);
