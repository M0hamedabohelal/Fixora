// import React from 'react'
// import style from "./Layout.module.css"

import { Outlet } from "react-router-dom"


const Layout = () => {
    return (
        <main>
            
            <Outlet />
            
        </main>
    )
}

export default Layout
