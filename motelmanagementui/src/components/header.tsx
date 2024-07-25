import Menu from "./menu";

export default function Header() {
  return (
    <header>
      <div className="logo">OMS.</div>
      <Menu />
      <ul className="horizontal">
        <li className="btn">Đăng Ký</li>
        <li className="btn">Đăng Nhập</li>
      </ul>
    </header>
  );
}
