import React, { useState } from 'react';
import { Container, Row, Col, Image, Button,Form} from 'react-bootstrap';
import './profile.css'; 


const Profile = () => {
  const [selectedSection, setSelectedSection] = useState(null); // Default selected section
  const [userInfo, setUserInfo] = useState({
    username: 'sergiu',
    fullName: 'zamel',
    email: 'sergiu@example.com',
  });
  const [editMode, setEditMode] = useState(false);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic to update user information
    console.log('Form submitted with:', userInfo);
    setEditMode(false);
  };

  return (
    <Container fluid className="profile-container">
      <Row>
        {/* Left sidebar */}
        <Col sm={3} className="left-sidebar">
          <div className="profile-info">
            <Image src="profile-pic.jpg" roundedCircle className="profile-pic" />
            <div className="sidebar-item" onClick={() => handleSectionClick('personal')}>
              <h4>Personal Information</h4>
            </div>
            <div className="sidebar-item" onClick={() => handleSectionClick('matches')}>
              <h4>Matches History</h4>
            </div>
          </div>
        </Col>
        {/* Right sidebar */}
        <Col sm={9} className="right-sidebar">
          {/* Content based on selected section */}
          {selectedSection === 'personal' && (
            <div className="personal-info">
              <h2>Personal Information</h2>
              <div className="user-info">
                <p><strong>Username:</strong> {userInfo.username}</p>
                <p><strong>Full Name:</strong> {userInfo.fullName}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
              </div>
              {editMode ? (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={userInfo.username}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter full name"
                      name="fullName"
                      value={userInfo.fullName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">Save Changes</Button>
                </Form>
              ) : (
                <Button variant="primary" onClick={handleEditClick}>Edit</Button>
              )}
            </div>
          )}
          {selectedSection === 'matches' && (
            <div className="matches-info">
              <h2>Matches History</h2>
              {/* Display matches history and stats */}
              <ul>
                <li>Match 1</li>
                <li>Match 2</li>
                <li>Match 3</li>
                {/* Display more matches */}
              </ul>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;