import Header from "./components/base/header";
import Menu from "./components/base/menu";
import Info from "./components/base/info";
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
          if (window.innerWidth < 860 && leftStatus == '300px') {
            setLeftStatus('')
          }
          else {
            setLeftStatus('300px')
            setRightStatus('')
          }
        }}>
          <i className="fa-solid fa-angles-right" ></i>
        </div>
        <DataContextProvider>
          <section id="menu-left" className={leftStatus=='300px'?'menu-left-active':''} style={{ width: leftStatus }}>
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
            setLeftStatus('')
          }
        }}>
          <i className="fa-solid fa-angles-left"></i>
        </div>
      </div>
    </>
  );
}
