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
import Toastify from './components/toastify';
import { ToastifyContext } from './libs/toastify_context';
import TypeList from './components/type_list';
import Dashboard from './components/dashboard';

export default function App() {
    const announceContext = useContext(AnnounceContext)
    const toastifyContext=useContext(ToastifyContext)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} index />
                <Route path="/home" element={<Container />}>
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="type" element={<TypeList />}/>
                    <Route path="room" element={<RoomList />} />
                    <Route path="renter" element={<PersonList />} />
                    <Route path="setting" element={<NotFound />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            {announceContext?.close ? <Announce /> : ''}
            {toastifyContext?.close ? <Toastify/> :''}
        </BrowserRouter>
    )
}