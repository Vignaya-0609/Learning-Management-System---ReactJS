import React from 'react'
import { useState } from 'react'
import MainContent from '../MainContent'
import Header from '../Header'
import AdminSideNavBar from './AdminSideNavBar'
function AdminLayout({children}) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className="grid-container">
    <AdminSideNavBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Header type="Admin" OpenSidebar={OpenSidebar}/>
    <MainContent>{children}</MainContent>
    </div>
  )
}

export default AdminLayout