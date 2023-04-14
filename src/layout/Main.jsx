import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
    return (
        <div className='w-100'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;