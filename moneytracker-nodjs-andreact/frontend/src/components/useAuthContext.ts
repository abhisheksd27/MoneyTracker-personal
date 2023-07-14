import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { useLocation } from "wouter";

export const useAuthContext = () => {
  const user = useContext(AuthContext);
  console.log(user);
  const [location, setLocation] = useLocation();

  if (location != "/login" && location != "/signup" && !user.loading && !user.logged_in) {
    console.log("Not logged in");
    setLocation("/login");
  }
  return user;
};
