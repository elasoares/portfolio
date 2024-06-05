/* eslint-disable react/prop-types */
import styles from "./TextField.module.css";

export function TextField({ type, placeholder, value, name,onBlur, onChange,className }) {
  return (
    <>
      <input
        className={`${className} ${styles.textfield}`}
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </>
  );
}
