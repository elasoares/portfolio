import { Link } from 'react-router-dom';
import styles from './Footer.module.css'


export function Footer() {
  return (
    <div className={styles.container}>
      <p>© Copyright 2024 - feito por <Link to="/">Elaine Soares</Link> </p>
    </div>
  );
}
