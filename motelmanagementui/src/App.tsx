import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Container from './Container';

import "./styles.css";
import Announce from './components/announce';

export default function App() {
    const [message,setMessage]=useState("");
    const [type,setType]=useState("")
    const [state,setState]=useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login setMessage={setMessage} setType={setType} close={setState}/>} />
                <Route path="/about" element={<Container />}>
                    {/* <Route path="company" element={} />
                    <Route path="product" element={} /> */}
                </Route>
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            {state?<Announce message={message} type={type} close={setState}/>:''}
        </BrowserRouter>
        
    )
}