import React from 'react'
import { useState } from 'react'
import InstructorSideNavBar from './InstructorSideNavBar'
import Header from '../Header'
import MainContent from '../MainContent'

function InstructorLayout({children}) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div class="grid-container">
    <InstructorSideNavBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Header type="Instructor" OpenSidebar={OpenSidebar}/>
    <MainContent>{children}</MainContent>
    </div>
  )
}

export default InstructorLayout