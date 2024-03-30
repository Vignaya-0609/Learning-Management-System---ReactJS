import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import AnnouncementTab from '../../components/AnnouncementTab';
import ChatTab from '../../components/ChatTab';

const InstructorCommunication = () => (
  <>
  <h4 className="mb-3">Communication</h4> 
    <div className="container-fluid mt-5">
      <Tab.Container id="myTabs" defaultActiveKey="content1">
        <Nav justify variant="tabs" className="nav-justified">
          <Nav.Item>
            <Nav.Link eventKey="content1" className="fw-medium">Announcement</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="content2" className="fw-medium">Chat</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-2">
          {/* Announcement Tab */}
          <Tab.Pane eventKey="content1">
            <AnnouncementTab/>
          </Tab.Pane>

          {/* Chat Tab */}
          <Tab.Pane eventKey="content2">
            <ChatTab/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
    </>
);

export default InstructorCommunication;
