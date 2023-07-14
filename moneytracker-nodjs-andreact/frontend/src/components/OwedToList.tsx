import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { axiosClient } from "../utils";
import { useAuthContext } from "./useAuthContext";

interface Owe {
  byUsername: string;
  toUsername: string;
  amt: number;
}

export default function OwedToList() {
  let info = useAuthContext();
  const [owes, setOwes] = useState([] as Owe[]);

  async function load() {
    let resp = await axiosClient.get("owed/by");
    setOwes(resp.data.data);
  }

  async function settleOwe(toUsername: string) {
    await axiosClient.get(`/owed/settle?to=${toUsername}&by=${info.user.username}`);
    location.reload();
  }

  useEffect(() => {
    load();
  }, [info]);
  return (
    <div style={{ display: "flex", gap: "50px" }}>
      {owes.map((owe, index) => {
        return (
          <div
            key={index}
            style={{
              padding: "15px 20px",
              border: "2px solid black",
              borderRadius: "6px",
              marginTop: "50px",
              width: "max-content",
              fontSize: "18px",
              minWidth: "150px",
            }}
          >
            <span style={{ fontWeight: "600", color: "darkred" }}>
              ₹{owe.amt}
            </span>
            <span style={{ margin: "0 10px" }}>
              owed to <b>{owe.toUsername}</b>
            </span>{" "}
            <br /> <br />
            <Button onClick={(_) => settleOwe(owe.toUsername)} className="actionBtn">
              <small>Settle</small>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
