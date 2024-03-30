import React, { useEffect } from 'react'
import course from "../../assets/images/course.png";
import badge from "../../assets/images/badge.png";
import Profile from '../../components/Profile';
import DashboardCard from '../../components/DashboardCard';
import BarChart from '../../components/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEnrolledCoursesDetails } from '../../slices/CourseSlice';
function StudentDashboard() {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const enrolledCourses = useSelector((state) => state.course.enrolledCourses);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch enrolled courses details only if the currentUser and enrolledCourses are available
    if (currentUser && currentUser.coursename.length > 0 && enrolledCourses.length === 0) {
      const enrolledCourseIds = currentUser.coursename.map(course => course.id);
      dispatch(getEnrolledCoursesDetails(enrolledCourseIds));
    }
  }, [currentUser, enrolledCourses, dispatch]);

  const courseCount = enrolledCourses ? enrolledCourses.length : 0;
  const labels = ['Overall Completion(%)', 'Performance(%)', 'Consistency(%)', 'Time Spent(%)'];
  const data = [65, 59, 80, 81];
  const label="Your Activity";
  return (
    <>
    <Profile/>
    {/* Dashboard */}
    <h4 class="mt-4">Dashboard</h4>
    <div class="row dashboard d-flex flex-row">
            <div class="col-md-4">
                <div class="row d-flex flex-column">
                    <div class="mt-3 mb-3">
                        <div class="col-sm-12">
                          <Link to="/student/enrolled-courses" className="text-decoration-none">
                            <DashboardCard name="Courses" count={courseCount} img={course}/>
                            </Link>
                        </div>
                    </div>
                    <div class="mt-3 mb-3">
                          <div class="col-sm-12">
                          <Link to="/student/grades" className="text-decoration-none"> 
                          <DashboardCard name="Badges" count={150} img={badge}/>
                          </Link>
                          </div>
                    </div>
                </div>
            </div>
            {/* bar chart */}
            <BarChart chartLabels={labels} label={label} chartData={data} />
    </div>
    </>
  )
}

export default StudentDashboard