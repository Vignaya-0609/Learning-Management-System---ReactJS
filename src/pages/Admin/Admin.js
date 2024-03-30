// Admin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import CourseManagement from './CourseManagement';
import UserManagement from './UserManagement';
import Report from './Report';
import CourseDetails from './CourseDetails';

function Admin() {
  return (
    // sub Routes
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="course-management/*" element={<CourseManagement />} />
      <Route path="/course-management/details/:id" element={<CourseDetails />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="report" element={<Report />} />
    </Routes>
  );
}

export default Admin;
