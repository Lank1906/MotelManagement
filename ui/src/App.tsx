import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Container from './Container';

import "./styles.css";
import "./libs.css";
import Announce from './components/base/announce';
import { AnnounceContext } from './libs/announce_context';
import NotFound from './components/base/notfound';
import RoomList from './components/room/info/room_list';
import PersonList from './components/renters/person_list';
import Toastify from './components/base/toastify';
import { ToastifyContext } from './libs/toastify_context';
import TypeList from './components/type/type_list';
import Dashboard from './components/dashboard/dashboard';
import ServiceList from './components/service/service_list';

export default function App() {
    const announceContext = useContext(AnnounceContext)
    const toastifyContext=useContext(ToastifyContext)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} index />
                <Route path="/home" element={<Container />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="type" element={<TypeList />}/>
                    <Route path="service" element={<ServiceList/>}/>
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