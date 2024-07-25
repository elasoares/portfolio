/* eslint-disable react/prop-types */
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
      {children}
      </main>
      <Footer />
    </>
  );
}
