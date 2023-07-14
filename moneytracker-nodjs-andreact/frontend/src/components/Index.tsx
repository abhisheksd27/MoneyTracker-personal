import { useState } from "react";
import CircleProgress from "./CircleProgress";
import styles from "../styles/Index.module.css";
import { Button, Tab, Tabs } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import NewTxModal from "./NewTxModal";
import TxList from "./TransactionList";
import OwedToList from "./OwedToList";
import OwedByList from "./OwedByList";
import { useAuthContext } from "./useAuthContext";

export default function Index() {
  const info = useAuthContext();

  const [showNewTx, setShowNewTx] = useState(false);

  return (
    <div className={styles.container}>
      <NewTxModal show={showNewTx} setShow={setShowNewTx}></NewTxModal>

      <div>
        <CircleProgress
          spent={info.total_monthly_spend}
          limit={info.user.monthly_budget}
        ></CircleProgress>
      </div>
      <p>
        <b>Remaining</b>: ₹
        {Math.max(info.user.monthly_budget - info.total_monthly_spend, 0)} / ₹
        {info.user.monthly_budget}{" "}
      </p>
      <Button
        variant="primary"
        className={styles.actionBtn}
        onClick={(_) => setShowNewTx(true)}
      >
        <FaPlus style={{ marginRight: "14px" }}></FaPlus>
        Add Expense
      </Button>
      <div style={{ display: "block", width: "75%" }}>
        <Tabs defaultActiveKey={"transaction"} fill>
          <Tab eventKey="transaction" title="Transactions">
            <TxList></TxList>
          </Tab>
          <Tab eventKey="owed_by" title="Money Owed By You">
            <OwedToList></OwedToList>
          </Tab>
          <Tab eventKey="owed_to" title="Money Owed To You">
            <OwedByList></OwedByList>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
