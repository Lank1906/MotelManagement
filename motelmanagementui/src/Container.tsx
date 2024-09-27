import Header from "./components/header";
import Menu from "./components/menu";
import Info from "./components/info";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DataContextProvider } from "./libs/data_handling_context";

export default function Container() {
  const [leftStatus, setLeftStatus] = useState('');
  const [rightStatus, setRightStatus] = useState('');
  return (
    <>
      <Header />
      <div id="body">

        <div className="arrow" onClick={() => {
          if (window.innerWidth < 860 && leftStatus == '350px') {
            setLeftStatus('')
          }
          else {
            setLeftStatus('350px')
          }
        }}>
          <i className="fa-solid fa-angles-right" ></i>
        </div>
        <DataContextProvider>
          <section id="menu-left" style={{ width: leftStatus }}>
            <Menu widthE={leftStatus} />
          </section>
          <Outlet />
          <Info widthE={rightStatus} />
        </DataContextProvider>
        <div className="arrow2" onClick={() => {
          if (window.innerWidth < 860 && rightStatus == '350px') {
            setRightStatus('')
          }
          else {
            setRightStatus('350px')
          }
        }}>
          <i className="fa-solid fa-angles-left"></i>
        </div>
      </div>
    </>
  );
}
