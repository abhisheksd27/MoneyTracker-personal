import styles from "../styles/CircleProgress.module.css";

export default function CircleProgress({
  spent,
  limit,
}: {
  spent: number;
  limit: number;
}) {
  let percent = spent / limit;
  let skewFirst = percent > 0.5 ? 0 : (1 - percent / 0.5) * 90;
  percent -= 0.5;
  let skewSecond = 90;
  if (percent > 0) skewSecond = percent > 0.5 ? 0 : (1 - percent / 0.5) * 90;
  let background = spent > limit ? "darkred" : "green";

  return (
    <div className={styles["circular-progress"]}>
      <div className={styles["circular-progress-circle"]}>
        <div
          className={styles.segment}
          style={{
            transform: `rotate(180deg) skew(${skewFirst}deg)`,
            background,
          }}
        ></div>
        <div
          className={styles.segment}
          style={{
            transform: `rotate(270deg) skew(${skewSecond}deg)`,
            background,
          }}
        ></div>
        <div
          className={`${styles.segment} ${styles.segmentbg}`}
          style={{ transform: "rotate(270deg) skew(0deg)" }}
        ></div>
        <div
          className={`${styles.segment} ${styles.segmentbg}`}
          style={{ transform: "rotate(180deg) skew(0deg)" }}
        ></div>
        <div className={styles["circular-progress-inner"]}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "80%",
              gap: "20px",
              flexFlow: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "60px",
              fontWeight: "600",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 500 }}>
              Monthly Spend
            </div>
            ₹{spent ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}
