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
        <Content />
        <Info />
      </div>
    </>
  );
}
