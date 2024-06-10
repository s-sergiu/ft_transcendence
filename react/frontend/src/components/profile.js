import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import './css/profile.css'; 
import ChangeInfo from './ChangeInfo';
import MatchHistory from './MatchHistory';
import GetMatchWins from './GetMatchWins';
import GetMatchLoss from './GetMatchLoss';
import pic6 from './profile.png'

const Profile = (props) => {
  const { login } = props;
  const [selectedSection, setSelectedSection] = useState(null);
  const [userInfo, setUserInfo] = useState({
    login: '',
    first_name: '',
    last_name: '',
	location: '',
    profilePic: '',
    wins: 0,
    losses: 0,
    matchHistory: [],
  });
	const getLoginName = () => {
		if (login && login.login) {
			return login.login
		}
		return null
	}

  const { wins } = GetMatchWins(getLoginName());
  const { loss } = GetMatchLoss(getLoginName());
  const [editMode, setEditMode] = useState(false);

  const handleSectionClick = async (section) => {
    setSelectedSection(section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleEditClick = () => {
	userInfo.first_name = login.first_name;
	userInfo.last_name = login.last_name;
	userInfo.location = login.location;
    setEditMode(!editMode);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
	if (userInfo.first_name && userInfo.location) {
		props.login.first_name = userInfo.first_name;
		props.login.last_name = userInfo.last_name;
		props.login.location = userInfo.location;
		setUserInfo( { ...userInfo, location: props.login.location });
		
		// Logic to update user information
		const info = { login, userInfo } 
		ChangeInfo(info);
	}
    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInfo({ ...userInfo, profilePic: reader.result });
      console.log('Uploaded image', reader.result);
      props.login.image_medium = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
	
	console.log(wins);
	console.log(loss);
if (login) {
  return (
    <div className='div_global'>
      <h1 className="display-4">Welcome your dashboard</h1>
      {/* <img src={pic6} className="img-thumbnail" alt="..."></img> */}
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
                <p><strong>Location:</strong> {(login.location) ? login.location : "None"}</p>
                <p><strong>Wins:</strong> {(wins) ? (wins.result) : ("0")}</p>
                <p><strong>Losses:</strong> {(loss) ? (loss.result) : ("0")}</p>
              </div>
              {editMode ? (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      name="first_name"
                      value={userInfo.first_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="last_name"
                      value={userInfo.last_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter location"
                      name="location"
                      value={userInfo.location}
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
          {selectedSection === 'matches' && (<MatchHistory user = { login.login } />)}
        </Col>
      </Row>
    </Container>
    </div>
  );
}
};

export default Profile;
