import { useState } from "react";
import { axiosClient } from "../utils";
import styles from "../styles/Login.module.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { Alert, InputGroup } from "react-bootstrap";
import { useLocation } from "wouter";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [budget, setBudget] = useState(1500);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [location, setLocation] = useLocation();

  async function handle() {
    let resp = await axiosClient.post("user/signup", {
      username,
      password,
      budget,
    });

    setMsg("");
    setErr("");

    if (resp.data.err) {
      setErr(resp.data.data);
    } else {
      setMsg(resp.data.data);
      setTimeout(() => setLocation("/login"), 1000);

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
        <fieldset>
          <h4 className={styles.header}>
            <strong>Sign up</strong>
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

          <Form.Group className="mb-4">
            <Form.Label>Set a monthly budget</Form.Label>
            <InputGroup>
              <InputGroup.Text>Rs.</InputGroup.Text>
              <Form.Control
                type="number"
                className={styles.input}
                step={500}
                value={budget}
                min={1500}
                onChange={(e) => setBudget(parseInt(e.target.value))}
              ></Form.Control>
            </InputGroup>
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
                <small>Sign up</small>
            </Button>
          </Form.Group>

          <Form.Text>
            Already a member? <a href="/login">Sign in</a>
          </Form.Text>
        </fieldset>
      </Form>
    </div>
  );
}
