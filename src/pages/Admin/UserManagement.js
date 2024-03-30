import React from 'react'
import UserTable from '../../components/UserManageTable';
import { Button } from 'react-bootstrap';
import AddUserModal from '../../components/AddUserModal';
import { useState } from 'react';
function UserManagement() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
    {/* add user */}
    <div className="d-flex justify-content-between mb-3">
            <h4>User Management</h4>
            <Button variant="" type="button" className="btn-color"  onClick={handleShowModal}>
                Add User
            </Button>
      </div>
      {/* user list */}
    <UserTable/>
    <AddUserModal show={showModal} handleClose={handleCloseModal}/>
    </>
  )
}

export default UserManagement