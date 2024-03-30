import React, { useEffect, useState } from 'react'
import course from "../../assets/images/course.png";
import user from "../../assets/images/active-user.png";
import Profile from '../../components/Profile';
import DashboardCard from '../../components/DashboardCard';
import BarChart from '../../components/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsersFromJson } from '../../slices/UserSlice';
import { getCoursesFromJson } from '../../slices/CourseSlice';
function AdminDashboard() {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  console.log(currentUser)
  const userList = useSelector((state) => state.user.userList);
  const courseList = useSelector((state) => state.course.courseList);
  const userCount = userList.length;
  // console.log(currentUser.education)
  const dispatch=useDispatch();
  useEffect(()=>{
     dispatch(getUsersFromJson());
     dispatch(getCoursesFromJson());
  },[dispatch])
  const courseCount = courseList.length;
  // const labels = ['HTML', 'CSS', 'JavaScript', 'ReactJS'];
  // const data = [15, 10, 15, 20];
  const label="Users";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Dynamically generate labels and count users for each course
    const tempLabels = [];
    const tempData = [];
  
    courseList.forEach(course => {
      tempLabels.push(course.coursename); 
      const usersInCourse = userList.filter(user => user.coursename.some(c => c.id === course.id)).length;  
      tempData.push(usersInCourse);
    });
  
    setLabels(tempLabels);
    setData(tempData);
  }, [courseList, userList]);
  

  return (
    <>
    <Profile />
    {/* Dashboard */}
    <h4 className="mt-4">Dashboard</h4>
    <div className="row dashboard d-flex flex-row">
            <div className="col-md-4">
                <div className="row d-flex flex-column">
                    <div className="mt-3 mb-3"> 
                        <div className="col-sm-12">
                          <Link to="/admin/course-management" className='text-decoration-none'>
                            <DashboardCard name="Courses" count={courseCount} img={course}/>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-3 mb-3">
                          <div className="col-sm-12">
                            <Link to="/admin/user-management" className='text-decoration-none'>
                              <DashboardCard name="Users" count={userCount} img={user}/>
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

export default AdminDashboard;