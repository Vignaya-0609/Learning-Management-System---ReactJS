import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnnouncementToJson } from '../slices/AnnouncementSlice';


function EditAnnouncementModal({ show, handleClose }) {
  const [announcement, setAnnouncement] = useState('');
  const [id, setId] = useState(0);
  const  {selectedAnnouncement}  = useSelector((state) => state.announcement);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(selectedAnnouncement).length !== 0) {
      setAnnouncement(selectedAnnouncement.announcement);
      setId(selectedAnnouncement.id);
    }
  }, [selectedAnnouncement]);

// edit
  const editedAnnouncement = () => {
    handleClose();
    const date = new Date(); 
    dispatch(updateAnnouncementToJson({
      id,
      announcement,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, // Updated date
    }));
  };

  return (
    <>
    {/* edit form */}
      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12} className="p-2" id={id}>
              <Form.Group className="mb-3">
                <Form.Label className='fw-medium'>Announcement<span className="text-danger"> *</span></Form.Label>
                <Form.Control as="textarea" placeholder="Leave a announcement here" value={announcement} onChange={(e)=>setAnnouncement(e.target.value)}/>
                <Form.Text className="text-danger" id="usererror"></Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="btn-color" onClick={editedAnnouncement}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAnnouncementModal;
