import React, {useState,useEffect}from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import EditUserModal from './EditUserModal';
import { useDispatch, useSelector } from 'react-redux';
import {getUsersFromJson, setSelectedUser } from '../slices/UserSlice';
import DeleteUserModal from './DeleteUserModal';
const UserTable = () => {
  const {userList}=useSelector((state)=>state.user);
  const [searchQuery, setSearchQuery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModal1 = () => setShowModal1(false);
  const dispatch=useDispatch();
  let editUser=(user)=>{
    dispatch(setSelectedUser(user));
    setShowModal(true);
  }
  let deleteUser=(user)=>{
    dispatch(setSelectedUser(user));
    setShowModal1(true);
  }
  useEffect(()=>{
    dispatch(getUsersFromJson())
  },[dispatch])

  const filteredUsers = searchQuery ? userList.filter(user => {
    return user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
           user.email.toLowerCase().includes(searchQuery.toLowerCase());
  }) : userList;

  // const filteredUsers = userList.filter(user => {
  //   return user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //          user.email.toLowerCase().includes(searchQuery.toLowerCase());
  // });
  // console.log(filteredUsers)

  return (
    <>
    <Container fluid className="shadow p-3 rounded-2">
      <Row className="mb-3">
        <Col md={8}>
          <InputGroup>
            <FormControl type="text" id="searchInput" placeholder="Search" className="mb-3" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {/* user details */}
          {filteredUsers.length > 0 ? (
            <Table bordered striped responsive id="myTable1">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="sno">{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.usertype}</td>
                    <td>{Array.isArray(user.coursename) ? user.coursename.map((course) => course.name).join(', ') : user.coursename}</td>
                    <td>
                      <Button variant="outline-warning btn-color mb-2" onClick={() => editUser(user)}>
                        <FaUserEdit className="text-dark" />
                      </Button>
                      &nbsp;
                      <Button variant="outline-warning btn-color mb-2" onClick={() => deleteUser(user)}>
                        <MdDeleteSweep className="text-dark" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div>No records found</div>
          )}
        </Row>
    </Container>
    {/* crud operations */}
    <EditUserModal show={showModal} handleClose={handleCloseModal} />
    <DeleteUserModal show={showModal1} handleClose={handleCloseModal1}/>
    </>
  );
};

export default UserTable;
