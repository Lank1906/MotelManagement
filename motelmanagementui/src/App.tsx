import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Container from './Container';

import "./styles.css";
import Announce from './components/announce';
import { AnnounceContext} from './libs/announce_context';
import NotFound from './components/notfound';

export default function App() {
    const announceContext=useContext(AnnounceContext)
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>} index/>
                    <Route path="/about" element={<Container />}>
                        {/* <Route path="company" element={} />
                        <Route path="product" element={} /> */}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            {announceContext?.close ? <Announce/> : ''}
            {announceContext?.close}
        </BrowserRouter>

    )
}