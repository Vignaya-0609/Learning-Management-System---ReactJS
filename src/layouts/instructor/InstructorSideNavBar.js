import React from 'react'
import "../../assets/sass/style.scss";
import { TbSquareRoundedLetterS } from "react-icons/tb";
import { IoCloseCircleOutline } from "react-icons/io5";
// import logo from "../../assets/images/logo.png";
import { FaHome } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdAssessment } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
function InstructorSideNavBar({openSidebarToggle, OpenSidebar}) {
  return (
    <>
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
    <div className='sidebar-title'>
        <div className='sidebar-brand'>
            <TbSquareRoundedLetterS className='icon_header'/> Skillo
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}><IoCloseCircleOutline /></span>
    </div>

    <div className='sidebar-list' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '83%' }}>
        <div className="h90">
            <NavLink to="/instructor/dashboard" className="text-decoration-none" 
            style={({ isActive }) => ({
                color: isActive ? 'black' : 'white',
                background: isActive ? '#f9e900' : '#08415c',
                display:"flex",fontWeight:"500"
            })}>
                <div className='sidebar-list-item'>
                    <FaHome className='icon'/> Dashboard
                </div>
            </NavLink>
            <NavLink to="/instructor/course-deliverables" className="text-decoration-none" style={({ isActive }) => ({
                color: isActive ? 'black' : 'white',
                background: isActive ? '#f9e900' : '#08415c',
                display:"flex",fontWeight:"500"
            })}>
                <div className='sidebar-list-item'>
                    <FaGraduationCap className='icon'/> Course Deliverables
                </div>
            </NavLink>
            <NavLink to="/instructor/assessment" className="text-decoration-none" style={({ isActive }) => ({
                color: isActive ? 'black' : 'white',
                background: isActive ? '#f9e900' : '#08415c',
                display:"flex",fontWeight:"500"
            })}>
                <div className='sidebar-list-item'>
                    <MdAssessment className='icon'/> Assessment
                </div>
            </NavLink>
            <NavLink to="/instructor/report" className="text-decoration-none" style={({ isActive }) => ({
                color: isActive ? 'black' : 'white',
                background: isActive ? '#f9e900' : '#08415c',
                display:"flex",fontWeight:"500"
            })}>
                <div className='sidebar-list-item'>
                    <BiSolidReport className='icon'/> Report
                </div>
            </NavLink>
            <NavLink to="/instructor/communication" className="text-decoration-none" style={({ isActive }) => ({
                color: isActive ? 'black' : 'white',
                background: isActive ? '#f9e900' : '#08415c',
                display:"flex",fontWeight:"500"
            })}>
                <div className='sidebar-list-item'>
                    <IoChatbubbles className='icon'/> Communication
                </div>
            </NavLink>
        </div>

        <div className="h10">
            <NavLink to="/" className="text-decoration-none" style={({ isActive }) => ({
                color: isActive ? 'black' : 'white',
                background: isActive ? '#f9e900' : '#08415c',
                display:"flex",fontWeight:"500"
            })}>
                <div className='sidebar-list-item'>
                    <FiLogOut className='icon'/> Logout
                </div>
            </NavLink>
        </div>
    </div>
    </aside>

    </>
  )
}

export default InstructorSideNavBar