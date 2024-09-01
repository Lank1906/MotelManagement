import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Container from './Container';

import "./styles.css";
import Announce from './components/announce';
import { AnnounceContext } from './libs/announce_context';
import NotFound from './components/notfound';
import RoomList from './components/room_list';
import PersonList from './components/person_list';
import { DataContextProvider } from './libs/data_handling_context';

export default function App() {
    const announceContext = useContext(AnnounceContext)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} index />
                <Route path="/home" element={<Container />}>
                    <Route path="dashboard" element={<h1>test</h1>} />
                    <Route path="room" element={<RoomList />} />
                    <Route path="renter" element={<PersonList />} />
                    <Route path="setting" element={<NotFound />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            {announceContext?.close ? <Announce /> : ''}
        </BrowserRouter>
    )
}