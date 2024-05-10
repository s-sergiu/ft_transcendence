import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './profile.css'; 

const Profile = () => {
  const [selectedItem, setSelectedItem] = useState('username'); 

  const handleItemClick = (item) => {
    setSelectedItem(item);

  };

  return (
    <Container fluid className="profile-container">
      <Row>
        {/* Left sidebar */}
        <Col sm={3} className="left-sidebar">
          <div className="profile-info">
            <Image src="profile-pic.jpg" roundedCircle className="profile-pic" />
            <div className="sidebar-item" onClick={() => handleItemClick('username')}>
              <h4>Username</h4>
            </div>
            <div className="sidebar-item" onClick={() => handleItemClick('fullname')}>
              <h4>Full Name</h4>
            </div>
            <div className="sidebar-item" onClick={() => handleItemClick('email')}>
              <h4>Email</h4>
            </div>
            <div className="sidebar-item" onClick={() => handleItemClick('playedmatches')}>
              <h4>Played Matches</h4>
            </div>
            <Button onClick={() => handleItemClick('settings')} variant="primary">Settings</Button>
          </div>
        </Col>
        {/* Right sidebar */}
        <Col sm={9} className="right-sidebar">
          {/* Content based on selected item */}
          <h2>{selectedItem}</h2>
          {/* Display other information based on selected item */}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
