import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { axiosClient, categories, categoriesWithEmojis } from "../utils";
import styles from "../styles/NewTxModal.module.css";

export default function NewTxModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Function;
}) {
  const defaultData = {
    amount: 0,
    name: "",
    splitUsers: [] as string[],
    category: "Food",
  };
  const [data, setData] = useState(defaultData);
  const [userNames, setUserNames] = useState([] as string[]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isSplit, setIsSplit] = useState(false);

  async function getUsers() {
    let resp = await axiosClient.get("user/names");
    console.log(resp.data);
    setUserNames(resp.data);
  }

  async function createTx() {
    let newData = { ...data, splitUsers: data.splitUsers.join(",") };
    await axiosClient.post("tx/create", newData);
    setShow(false);
    location.reload();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
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
                <option key={index} value={categories[index]}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <InputGroup>
            <Form.Check
              id="split-check"
              onChange={(e) => setIsSplit(e.target.checked)}
            ></Form.Check>
            <Form.Label style={{ marginLeft: "5px" }} htmlFor="split-check">
              Split with other users
            </Form.Label>
          </InputGroup>
          {isSplit ? (
            <Form.Group className="mb-4">
              <Form.Group>
                <Form.Label>Split with users:</Form.Label>
                <Form.Group>
                  <Form.Text>
                    {data.splitUsers.map((user) => (
                      <p
                        key={user}
                        className={styles.selectedUser}
                        onClick={(_) => {
                          let index = data.splitUsers.indexOf(user);
                          data.splitUsers.splice(index, 1);
                          let newSplit = [...data.splitUsers];
                          setData({ ...data, splitUsers: newSplit });
                        }}
                      >
                        {user}
                      </p>
                    ))}
                  </Form.Text>
                </Form.Group>
              </Form.Group>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                ></Form.Control>
                <Button
                  onClick={(_) => {
                    const newSplit = [...data.splitUsers];
                    newSplit.push(selectedUser);
                    setSelectedUser("");
                    setData({ ...data, splitUsers: newSplit });
                  }}
                >
                  Add
                </Button>
              </InputGroup>
            </Form.Group>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createTx} className="actionBtn">Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
