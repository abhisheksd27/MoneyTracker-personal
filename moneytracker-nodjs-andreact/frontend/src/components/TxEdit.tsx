import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { axiosClient, categories, categoriesWithEmojis } from "../utils";

export default function TxEdit({
  show,
  id,
  setShow,
}: {
  show: boolean;
  setShow: Function;
  id: number;
}) {
  const defaultData = {
    amount: 0,
    name: "",
    category: "Food",
  };
  const [data, setData] = useState(defaultData);

  async function load() {
    if (id == -1) return;
    let resp = await axiosClient.get("tx/" + id);
    console.log("tx");
    console.log(resp.data);
    setData(resp.data);
  }

  useEffect(() => {
    load();
  }, [id]);

  async function editTx() {
    await axiosClient.put("tx/" + id, data);
    setShow(false);
    location.reload();
  }

  return (
    <>
      {id != -1 && show ? (
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-4">
              <Form.Label>Expense Name: </Form.Label>
              <Form.Control
                type="text"
                name="name"
                maxLength={40}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Amount:</Form.Label>
              <InputGroup>
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  min={1}
                  name="number"
                  type="number"
                  value={data.amount}
                  onChange={(e) =>
                    setData({ ...data, amount: parseInt(e.target.value) })
                  }
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                {categoriesWithEmojis.map((cat, index) => (
                  <option key={index} value={categories[index]}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={editTx} className="actionBtn">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}
