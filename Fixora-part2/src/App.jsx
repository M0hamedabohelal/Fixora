// import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout.jsx"
import Home from "./Pages/Home/Home.jsx"
import Orders from "./Pages/Orders/Orders.jsx"
import OrderDetails from "./Pages/OrderDetails/OrderDetails.jsx"
import Notifications from "./Pages/Notifications/Notifications.jsx"
const App = () => {
  const router = createBrowserRouter([
    {
      path:'' , 
      element : <Layout />,
      children : [
        {path : '', element : <Home/>},
        { path: "Orders", element: <Orders /> },
        { path: "/orders/:id", element: <OrderDetails /> },
        { path: "notifications", element: <Notifications /> },
      ]

    },
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
