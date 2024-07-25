import Header from "./components/header";
import Menu from "./components/menu";
import "./styles.css";

export default function App() {
  return (
    <>
      <Header />
      <div id="body">
        <section id="menu-left"></section>
        <section id="content"></section>
        <section id="info"></section>
      </div>
    </>
  );
}
