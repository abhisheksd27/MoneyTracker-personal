import { useState } from "react";
import { axiosClient } from "../utils";
import styles from "../styles/Login.module.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { Alert } from "react-bootstrap";
import { useLocation } from "wouter";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function handle() {
    let resp = await axiosClient.post("user/login", {
      username,
      password,
    });

    setMsg("");
    setErr("");

    if (resp.data.err) {
      setErr(resp.data.data);
    } else {
      setMsg(resp.data.data);
      console.log("login");
      location.href = "/";
    }
    console.log(resp.data);
  }

  return (
    <div className={styles.container}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handle();
        }}
      >
        <fieldset className={styles.fieldset}>
          <h4 className={styles.header}>
            <strong>Sign in</strong>
          </h4>
          <Form.Group className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              className={styles.input}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {msg != "" ? (
            <Alert variant="success">
              <small>{msg}</small>
            </Alert>
          ) : null}

          {err != "" ? (
            <Alert variant="danger">
              <small>{err}</small>
            </Alert>
          ) : null}

          <Form.Group className="mb-3">
            <Button variant="primary" type="submit" className={styles.btn}>
              <small>Sign in</small>
            </Button>
          </Form.Group>

          <Form.Text>
            Not yet a member? <a href="/signup">Sign up</a>
          </Form.Text>
        </fieldset>
      </Form>
    </div>
  );
}
