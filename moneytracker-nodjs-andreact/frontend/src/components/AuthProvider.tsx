import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { axiosClient } from "../utils";

export default function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState({
    user: { monthly_budget: 0, username: "" },
    logged_in: false,
    loading: true,
    total_monthly_spend: 0,
  });

  async function load() {
    let resp = await axiosClient.get("user/current");
    console.log("auth provider");
    console.log(resp.data);
    setUser({ ...resp.data, loading: false });
  }

  useEffect(() => {
    load();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
