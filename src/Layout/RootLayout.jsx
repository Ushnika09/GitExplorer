import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Header/>
        <div class="bg-gradient-to-r from-purple-200/40 via-white to-amber-200/40 p-6 min-h-screen">
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout