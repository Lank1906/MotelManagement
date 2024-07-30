import Header from "./components/header";
import Menu from "./components/menu";
import Info from "./components/info";
import Content from "./components/content";
import "./styles.css";

export default function App() {
  return (
    <>
      <Header />
      <div id="body">
        <section id="menu-left">
          <Menu />
        </section>
        <div className="arrow">
          <i className="fa-solid fa-angles-right"></i>
        </div>
        <Content />
        <Info />
        <div className="arrow2">
          <i className="fa-solid fa-angles-left"></i>
        </div>
      </div>
    </>
  );
}
