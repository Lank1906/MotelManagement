import Header from "./components/header";
import Menu from "./components/menu";
import Info from "./components/info";
import Content from "./components/content";
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [leftStatus,setLeftStatus]=useState('');
  const [rightStatus,setRightStatus]=useState('');
  return (
    <>
      <Header />
      <div id="body">
        <section id="menu-left" style={{width:leftStatus}}>
          <Menu />
        </section>
        <div className="arrow" onClick={()=>{
          if(window.innerWidth<860 && leftStatus=='350px'){
            setLeftStatus('')
          }
          else{
            setLeftStatus('350px')
          }
        }}>
          <i className="fa-solid fa-angles-right" ></i>
        </div>
        <Content />
        <Info widthE={rightStatus}/>
        <div className="arrow2" onClick={()=>{
          if(window.innerWidth<860 && rightStatus=='350px'){
            setRightStatus('')
          }
          else{
            setRightStatus('350px')
          }
        }}>
          <i className="fa-solid fa-angles-left"></i>
        </div>
      </div>
    </>
  );
}
