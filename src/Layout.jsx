import React from 'react';
import { Outlet } from 'react-router-dom';
import s from './style.module.css';

function Layout() {
    return (
        <>
            <Outlet /> {/* В Outlet будет подставляться содержимое текущего маршрута */}
        </>
            
        
    );
}

export default Layout;
