import React, { useState } from 'react';
import { Row, Col, Nav, Tab, Form, Button } from 'react-bootstrap';
import '../assets/sass/style.scss';

const ChatComponent = () => {
  const [activeUser, setActiveUser] = useState('Ani');
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({
    Ani: [],
    Vikki: [],
    David:[],
    Vignaya:[],
  });

  const sendMessage = () => {
    if (inputMessage) {
      const newMessage = {
        text: inputMessage,
        sender: 'Instructor',
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [activeUser]: [...prevMessages[activeUser], newMessage],
      }));
      setInputMessage('');
    }
  };

  const renderChatMessages = () => {
    return chatMessages[activeUser].map((message, index) => (
      <div key={index} className={`message ${message.sender === 'Instructor' ? 'text-end' : 'text-start'}`}>
        <p className='mb-0'>{message.text}</p>
        <small>{message.timestamp}</small>
      </div>
    ));
  };

  return (
    // chat
    <div className="container-fluid mt-4">
      <Row>
        <Col md={3}>
          <Nav className="flex-column" variant="pills">
            {Object.keys(chatMessages).map((user) => (
              <Nav.Item key={user}>
                <Nav.Link
                  style={{
                    backgroundColor: activeUser === user ? '#f9e900' : '#fff',
                    color: activeUser === user ? 'black' : 'black'
                  }}
                  active={activeUser === user}
                  onClick={() => setActiveUser(user)}
                  id={`v-pills-${user}-tab`}
                  data-toggle="pill"
                  href={`#v-pills-${user}`}
                  role="tab"
                  aria-controls={`v-pills-${user}`}
                  aria-selected={activeUser === user}
                >
                  {user}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col md={9}>
          <Tab.Content>
            {Object.keys(chatMessages).map((user) => (
              <Tab.Pane key={user} eventKey={user} id={`v-pills-${user}`} role="tabpanel" aria-labelledby={`v-pills-${user}-tab`} className={`tab-pane fade ${activeUser === user ? 'show active' : ''}`}>
                <h6>{user}</h6>
                <div className="text-area h-25" id={`chat-${user}`} style={{maxHeight:"150px",overflowY:chatMessages[activeUser].length > 1 ? "auto" : "hidden" }}>
                  {renderChatMessages()}
                </div>
                <Form className="mt-2">
                  <Form.Group controlId={`chatMessage-${user}`} className='mb-2'>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="" className="btn-color" type="button" onClick={sendMessage}>
                    Send Message
                  </Button>
                </Form>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </div>
  );
};

export default ChatComponent;
