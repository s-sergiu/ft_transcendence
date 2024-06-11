import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import slide from './img/42.jpeg';
import slide2 from './img/row2.png';
import slide3 from './img/row3.png';
import slide4 from './img/2d.png';
import slide5 from './img/tourn.png';
import slide6 from './img/online.png';
import slide7 from './img/django.png';
import slide8 from './img/login.png';
import slide9 from './img/friend.png';
import slide33 from './img/background33.jpg';
import a from './abdel.jpg';
import s from './shettima.jpeg';
import r from './reda.jpg'
import ssergiu_pic from './sergiu.png';
import djmekki_pic from './djmekki.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { MDBContainer, MDBFooter } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/content.css'

const people = [
  { name: 'Abdelilah Noury', imageUrl: a },
  { name: 'Sergiu Ster', imageUrl: ssergiu_pic },
  { name: 'Reda Doukali', imageUrl: r },
  { name: 'Shettima Ali', imageUrl: s },
  { name: 'Djallal Mekki', imageUrl: djmekki_pic },
];

 
function Content() {
    return (
        <div>
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <Carousel.Caption>
                  <h1>
                  <span>Z</span>EAL-DRIVEN <span>E</span>FFORTS <span>B</span>OLSTER <span>I</span>NNOVATION
                </h1>
                  {/* <h3>Ping Pong Game finally online</h3> */}
                </Carousel.Caption>
                <img
                  className="d-block w-100"
                  src={slide}
                  alt="First slide"
                  />
              </Carousel.Item>
            </Carousel>

             <Container>
                <Row>
                <Col xs={12} md={6}>
                    <Image src={slide4} fluid className="custom-image"/>
                    <Image src={slide5} fluid className="custom-image"/>
                    <Image src={slide6} fluid className="custom-image"/>
                 </Col>
                <Col xs={12} md={6}>
                <div className='right'>
                    <h2>Ping Game 2D</h2>
                    <br></br>
                    <p>
    <p>
        Welcome to <strong>PING GAME</strong>, the ultimate ping pong experience powered by React and WebSocket Server (wss). <strong>PING GAME</strong> offers an exhilarating gameplay experience with both offline and online modes, catering to players of all skill levels.
    </p>

    <h3>Offline Play:</h3>
    <ul>
        <li><strong>1vs1 Locally:</strong> Grab a friend and challenge them to an intense 1vs1 match right from the comfort of your keyboard.</li>
        <li><strong>Play Against the Computer:</strong> Test your skills against a dynamic AI opponent, designed to mimic real player behavior for a truly immersive experience.</li>
        <li><strong>Create Tournaments:</strong> Host thrilling tournaments with your friends to determine who reigns supreme on the ping pong court.</li>
    </ul>

    <h3>Online Play:</h3>
    <ul>
        <li><strong>Random Match:</strong> Dive into the action with a spontaneous game against a random opponent from around the world.</li>
        <li><strong>Private Games:</strong> Create private matches and share the code with your friends for exclusive battles, ensuring every match is with someone you know and trust.</li>
    </ul>

                    </p>
                 </div>
                </Col>
                </Row>
             </Container>
            <br></br>

            <Container>
                <Row>
                <Col xs={12} md={6}>
                <div className='left'>
                    <h2>BackEnd</h2>
                    <br></br>
                    <p>
                    <h2>Django-Powered Backend</h2>
    <p>
        Welcome to <strong>SDjango</strong>, a robust backend solution for your web application built on Django, featuring seamless integration with APIs and PostgreSQL database management. <strong>SDjango</strong> empowers developers to create dynamic and secure web experiences with ease.
    </p>

    <h3>Authentication:</h3>
    <ul>
        <li><strong>Login with 42API:</strong> Users can effortlessly log in to their accounts using their 42API credentials, ensuring a smooth and secure authentication process.</li>
        <li><strong>Registration:</strong> New users have the option to register for an account, providing them access to the platform's features and functionalities.</li>
    </ul>

    <h3>Data Management:</h3>
    <ul>
        <li><strong>PostgreSQL Integration:</strong> <strong>Sergiu</strong> leverages the power of PostgreSQL, a powerful open-source relational database management system, to store and manage data efficiently and securely.</li>
    </ul>
  
    <h3>API Integration:</h3>
    <ul>
        <li><strong>JSON Response:</strong> <strong>Sergiu</strong> delivers data to clients in JSON format, ensuring compatibility and flexibility for consuming applications. Whether it's fetching user information or retrieving content from the database, <strong>Sergiu</strong> provides structured data responses for seamless integration with frontend applications.</li>
    </ul>

    <p>
        With <strong>Sergiu</strong>, developers can build scalable and feature-rich web applications, leveraging Django's robust framework and API capabilities. Experience the convenience and reliability of <strong>Sergiu</strong> for your next web project, and unlock endless possibilities for innovation and growth.
    </p>

                    </p>
                 </div>
                </Col>

                <Col xs={12} md={6}>
                  <br></br><br></br><br></br><br></br>
                    <Image src={slide7} fluid className="custom-image"/>
                    <Image src={slide8} fluid className="custom-image"/>
                    <Image src={slide9} fluid className="custom-image"/>
                 </Col>
                
                </Row>
             </Container>
            <br></br>

            <Container className="made-by-section">
              <h2>Made by:</h2>
              <Row className="d-flex justify-content-center">
                {people.map((person, index) => (
                  <Col key={index} md={2} className="person-box">
                    <Image src={person.imageUrl} roundedCircle className="person-image" />
                    <h5>{person.name}</h5>
                  </Col>
                ))}
              </Row>
            </Container>
                <br></br><br></br><br></br>
            <footer className="footer">
      <Row>
        <Col className="text-center py-3">
          <p>© 2024 .All rights reserved.</p>
        </Col>
      </Row>

  </footer>

      {/* <MDBFooter bgColor='dark' className='text-center text-white text-lg-left'>
      <MDBContainer className='p-4 pb-0'>
        <h4>made by</h4>
        <p>Transcendence 42team</p>
        &copy; {new Date().getFullYear()} Copyright{' '}
      </MDBContainer>
    </MDBFooter> */}
        </div>
          );
        }
export default Content;
