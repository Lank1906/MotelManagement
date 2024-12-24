import { useContext } from "react";
import { MyContext } from "../../libs/context";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const context=useContext(MyContext)
  const navigate=useNavigate();
  const logout=()=>{
    context?.setData("");
    navigate("/login")
  }
  return (
    <header>
      <div className="logo">OMS.</div>
      <ul className="horizontal">
        <li className="btn-2"><i className="fa-solid fa-bullhorn"></i></li>
        <li className="btn-2" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i></li>
      </ul>
    </header>
  );
}
