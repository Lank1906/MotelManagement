import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Container from './Container';

import "./styles.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<Container />}>
                    {/* <Route path="company" element={} />
                    <Route path="product" element={} /> */}
                </Route>
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
         
    )
}