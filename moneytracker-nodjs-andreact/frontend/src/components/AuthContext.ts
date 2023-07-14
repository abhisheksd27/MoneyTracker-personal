import { createContext } from "react";

export const AuthContext = createContext({
  user: {
    monthly_budget: 0,
    username: "",
  },
  logged_in: false,
  total_monthly_spend: 0,
  loading: true,
});
