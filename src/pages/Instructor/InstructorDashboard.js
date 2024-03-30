import React, { useEffect } from 'react'
import course from "../../assets/images/course.png";
import user from "../../assets/images/active-user.png";
import Profile from '../../components/Profile';
import "../../assets/sass/style.scss";
import DashboardCard from '../../components/DashboardCard';
import BarChart from '../../components/BarChart';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCoursesDetails } from '../../slices/CourseSlice';
import { getUsersFromJson } from '../../slices/UserSlice';
function InstructorDashboard() {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const userList=useSelector((state)=>state.user.userList);
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
  useEffect(()=>{
    dispatch(getUsersFromJson());
  },[dispatch])
  const userCount = userList.length;
  
  
  const labels = ['Available Courses', 'Overall Completion(students %)', 'Time Spent(students %)'];
  const data = [courseCount, 40, 25];
  const label="Activity";
  return (
    <>
    <Profile/>
    {/* Dashboard */}
    <h4 className="mt-4">Dashboard</h4>
    <div className="row dashboard d-flex flex-row">
            <div className="col-md-4">
                <div className="row d-flex flex-column">
                    <div className="mt-3 mb-3"> 
                        <div className="col-sm-12">
                        <NavLink to="/instructor/course-deliverables" style={{textDecoration:"none"}}>
                            <DashboardCard name="Courses" count={courseCount} img={course}/>
                        </NavLink>
                        </div>
                    </div>
                    <div className="mt-3 mb-3">
                          <div className="col-sm-12">
                          <NavLink to="/instructor/report" className="cardHover" style={{textDecoration:"none"}}>
                          <DashboardCard name="Students" count={userCount} img={user}/>
                          </NavLink>
                          </div>
                    </div>
                </div>
            </div>
            <BarChart chartLabels={labels} label={label} chartData={data} />
    </div>
    </>
  )
}

export default InstructorDashboard;