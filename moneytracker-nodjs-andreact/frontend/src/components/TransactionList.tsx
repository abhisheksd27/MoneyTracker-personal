import { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import styles from "../styles/TxList.module.css";
import { useAuthContext } from "./useAuthContext";
import { axiosClient, CATEGORY_EMOJIS } from "../utils";
import style from "../styles/Transaction.module.css";
import { FaFilter, FaPencilAlt, FaTrash } from "react-icons/fa";
import { Tx } from "./utils";
import TxEdit from "./TxEdit";

export default function TxList() {
  const [txs, setTransactions] = useState([] as Tx[]);
  const [showFilter, setShowFilter] = useState(false);
  const info = useAuthContext();

  const today = new Date(Date.now() + 1 * 86400 * 1000)
    .toISOString()
    .slice(0, 10);
  const lastYear = new Date(Date.now() - 86400 * 1000 * 365)
    .toISOString()
    .slice(0, 10);

  const [startDate, setStartDate] = useState(lastYear);
  const [endDate, setEndDate] = useState(today);
  const [showEditTx, setShowEditTx] = useState(false);
  const [activeTxId, setActiveTxId] = useState(-1);
  const [category, setCategory] = useState("");

  async function fetchTransactions() {
    if (info.loading) {
      console.log("loading");
      return;
    }
    let url = `tx/filter?start_date=${startDate}&end_date=${endDate}`;
    if (category != "") url += "&category=" + category;
    console.log({ url });
    let resp = await axiosClient.get(url);
    console.log(resp.data);
    setTransactions(resp.data);
  }

  async function deleteTx(id:number) {
    await axiosClient.delete("tx/" + id);
    location.reload();
  }

  useEffect(() => {
    fetchTransactions();
  }, [info]);
  function closeFilter() {
    setShowFilter(false);
    fetchTransactions();
  }

  return (
    <div className={styles.txContainer}>
      <TxEdit
        id={activeTxId}
        show={showEditTx}
        setShow={setShowEditTx}
      ></TxEdit>
      <Modal show={showFilter} onHide={closeFilter}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label>Start Date:</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              min={lastYear}
              max={today}
              onChange={(e) => setStartDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>End Date:</Form.Label>
            <Form.Control
              type="date"
              min={lastYear}
              max={today}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Category:</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">⚡ All</option>
              <option value="Food">🍕 Food</option>
              <option value="Clothing">👖 Clothing</option>
              <option value="Bills">🧾 Bills</option>
              <option value="Essential">🛍️ Essential</option>
              <option value="Other">❓ Other</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeFilter}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.filterWrapper}>
        <h6 style={{ textAlign: "left" }}>Recent transactions</h6>
        <Button className="actionBtn" onClick={(_) => setShowFilter(true)}>
          <FaFilter style={{ marginRight: "14px" }}></FaFilter>
          Filter
        </Button>
      </div>
      {txs.length < 1 ? <p>No transactions :( </p> : null}
      {txs.map((tx, index) => (
        <div key={index} className={style.container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h6 style={{ fontSize: "18px", fontWeight: "600" }}>
              ₹{tx.amount} • {tx.name}
            </h6>
            <div>
              <ButtonGroup>
                <Button onClick={() => {
                  setActiveTxId(tx.id);
                  setShowEditTx(true);
                }}>
                  <FaPencilAlt size={10} ></FaPencilAlt>
                </Button>
                <Button onClick={() => deleteTx(tx.id)} style={{ background: "darkred", border: 0  }}>
                  <FaTrash size={10}></FaTrash>
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>
              {CATEGORY_EMOJIS[tx.category]} {tx.category}
            </span>
            <span>
              {new Date(tx.date)
                .toString()
                .slice(0, "Sat Dec 12 2020 05:30:00".length)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
