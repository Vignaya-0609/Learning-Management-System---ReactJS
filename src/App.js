// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/student/MainLayout';
import Login from "./pages/login"
import Student from './pages/Student/Student';
import ForgetPassword from './pages/ForgetPassword';
import AdminLayout from './layouts/admin/AdminLayout';
import Admin from './pages/Admin/Admin';
import InstructorLayout from './layouts/instructor/InstructorLayout';
import Instructor from './pages/Instructor/Instructor';
import Quiz from './components/Test';

const App = () => {
  
  return(
  <Router>
    <Routes>
      <Route exact
        path="/"
        element={
          <div>
            {/* Main content for the default route */}
            <Login />
          </div>
        }
      />
      <Route
        path="/forgetPassword"
        element={
          <div>
            {/* Main content for the forgetPassword route */}
            <ForgetPassword/>
          </div>
        }
      />
      <Route
        path="/student/*"
        element={
          <MainLayout>
            {/* Main content for the student route */}
            <Student />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/*"
        element={
          <InstructorLayout>
            <Instructor/>
          </InstructorLayout>
        }
      />
      <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <Admin/>
          </AdminLayout>
        }
      />
      <Route
        path="/student/assessment/test/:id"
        element={
          <Quiz/>
        }
      />
    </Routes>
  </Router>
  )
};

export default App;
