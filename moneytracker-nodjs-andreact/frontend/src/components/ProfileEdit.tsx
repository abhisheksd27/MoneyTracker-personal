import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useLocation } from "wouter";
import { axiosClient } from "../utils";
import { useAuthContext } from "./useAuthContext";

export default function ProfileEdit({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Function;
}) {
  const info = useAuthContext();
  const [budget, setBudget] = useState(info.user.monthly_budget);

  async function edit() {
    await axiosClient.put("/user/" + info.user.username, {
      budget,
    });
    location.reload();
  }

  useEffect(() => {
    setBudget(info.user.monthly_budget);
  }, [info]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>Profile</Modal.Header>
      <Modal.Body>
        <Form.Label>Username: {info.user.username}</Form.Label>
        <Form.Group>
          <Form.Label>Monthly Budget:</Form.Label>
          <InputGroup>
            <InputGroup.Text>₹</InputGroup.Text>
            <Form.Control
              type="number"
              step={100}
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
            ></Form.Control>
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="success" onClick={edit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
