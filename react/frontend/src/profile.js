import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './profile.css'; 

const Profile = (props) => {
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
            <Image src={props.loginData.image_small} roundedCircle className="profile-pic" />
            <div className="sidebar-item" onClick={() => handleItemClick('username')}>
              <h4>{props.loginData.login}</h4>
            </div>
            <div className="sidebar-item" onClick={() => handleItemClick('fullname')}>
              <h4>{props.loginData.first_name} {props.loginData.last_name}</h4>
            </div>
            <div className="sidebar-item" onClick={() => handleItemClick('email')}>
              <h4>{props.loginData.email}</h4>
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
