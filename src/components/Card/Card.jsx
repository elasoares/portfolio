/* eslint-disable react/prop-types */

import styles from "./Card.module.css";

export function Card({ children, className }) {
  return (
    <>
      <div className={`${className} ${styles.card}`}>{children}</div>
    </>
  );
}
