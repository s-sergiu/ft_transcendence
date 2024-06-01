import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import './css/profile.css'; 
import ChangeInfo from './ChangeInfo';
import FetchInfo from './FetchInfo';
import pic6 from './profile.png'

const Profile = (props) => {
  const { login } = props;
  const [selectedSection, setSelectedSection] = useState(null); // Default selected section
  const [userInfo, setUserInfo] = useState({
    login: '',
    fullName: '',
    profilePic: '',
    wins: 0,
    losses: 0,
    matchHistory: [],
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
	console.log(login.email)
	console.log("after: ", userInfo);
    console.log('Form submitted with:', userInfo);
	const info = { login, userInfo } 
	console.log(info)
	ChangeInfo(info);
    setEditMode(false);
	console.log("result: ", FetchInfo(login.email));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInfo({ ...userInfo, profilePic: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

if (login) {
  return (
    <div className='div_global'>
      <h1 className="display-4">Welcome your dashboard</h1>
      <img src={pic6} className="img-thumbnail1" alt="..."></img>
    <Container fluid className="profile-container">
      <Row>
        {/* Left sidebar */}
        <Col sm={3} className="left-sidebar">
          <div className="profile-info">
            <Image src={login.image_medium} roundedCircle className="profile-pic" />
            <div className="change-picture-btn">
              <label htmlFor="upload-input" className="btn btn-primary">
                Change Picture
              </label>
              <input id="upload-input" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
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
                <p><strong>Login:</strong> {login.login}</p>
                <p><strong>Full Name:</strong> {login.first_name} {login.last_name}</p>
                <p><strong>Email:</strong> {login.email}</p>
                <p><strong>Wins:</strong> {userInfo.wins}</p>
                <p><strong>Losses:</strong> {userInfo.losses}</p>
              </div>
              {editMode ? (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="login"
                      value={userInfo.login}
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
              <table className="table">
                <thead>
                  <tr>
                    <th>Opponent</th>
                    <th>Result</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo.matchHistory.map(match => (
                    <tr key={match.id}>
                      <td>{match.opponent}</td>
                      <td>{match.result}</td>
                      <td>{match.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
}
};

export default Profile;
