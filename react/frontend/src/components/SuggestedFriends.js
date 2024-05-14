import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './css/SuggestedFriends.css'; 

const friendsData = [
  {
    id: 1,
    name: 'Sergiu',
    image: 'https://via.placeholder.com/150',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Sergiu',
    image: 'https://via.placeholder.com/150',
    info: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 1,
    name: 'Sergiu',
    image: 'https://via.placeholder.com/150',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Sergiu',
    image: 'https://via.placeholder.com/150',
    info: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 1,
    name: 'Sergiu',
    image: 'https://via.placeholder.com/150',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Sergiu',
    image: 'https://via.placeholder.com/150',
    info: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 1,
    name: 'Sergiu',
    image: 'https://via.placeholder.com/150',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Sergiu',
    image: 'https://via.placeholder.com/150',
    info: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },

];

const SuggestedFriends = () => {
  const handleAddFriend = (name) => {

  };

  return (
    <Container>
      <h1>Suggested Friends</h1>
      <Row>
        {friendsData.map((friend, index) => (
          <Col key={index} xs={12} md={4} lg={3}>
            <Card className="friend-card">
              <Card.Img variant="top" src={friend.image} />
              <Card.Body>
                <Card.Title>{friend.name}</Card.Title>
                <Card.Text>{friend.info}</Card.Text>
                <Button variant="primary" onClick={() => handleAddFriend(friend.name)}>Add Friend</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SuggestedFriends;
