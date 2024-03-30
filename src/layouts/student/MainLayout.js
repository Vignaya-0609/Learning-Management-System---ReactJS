import React from 'react'
import { useState } from 'react'
import SideNavBar from './SideNavBar'
import Header from '../Header'
import MainContent from '../MainContent'

function MainLayout({children}) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className="grid-container">
    <SideNavBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Header type="Student" OpenSidebar={OpenSidebar}/>
    <MainContent>{children}</MainContent>
    </div>


  )
}

export default MainLayout