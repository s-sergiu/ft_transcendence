// import './App.css';
// import React from 'react';
// import { useState } from 'react';
// import GuestNavbar from './components/GuestNavbar.js';
// import UserNavbar from './components/UserNavbar.js';
// import 'bootstrap/dist/css/bootstrap.min.css';


// function App() {

// 	const [login, setLogged] = useState(false);
// 	const [userData, setUserData] = useState();

// 	 if (login) {
// 		return (
// 			<UserNavbar 
// 				setLogged = { setLogged } 
// 				userData = { userData } 
// 			/>
// 		);
// 	 } else {
// 	 	return (
// 	 		<GuestNavbar 
// 	 			setLogged = { setLogged } 
// 				setUserData = { setUserData }
// 	 		/>
// 	 	);
// 	 }
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuestNavbar from './components/GuestNavbar.js';
import UserNavbar from './components/UserNavbar.js';
import ChatPage from './components/Chat/ChatPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import useWebSocket from './components/Chat/useWebSocket'; 

function App() {
  const [login, setLogged] = useState(false);
  const [userData, setUserData] = useState();
  const socket = useWebSocket('http://localhost:8000');

  useEffect(() => {
    if (login && socket) {
    } else if (socket) {
      socket.disconnect(); 
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [login, socket]); 

  const logout = () => {
    setLogged(false);
    setUserData(null);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            login ? (
              <UserNavbar setLogged={setLogged} userData={userData} logout={logout} /> 
            ) : (
              <GuestNavbar setLogged={setLogged} setUserData={setUserData} />
            )
          }/>
          <Route path="/chat" element={
            login ? (
              <div>
                <UserNavbar setLogged={setLogged} userData={userData} logout={logout} />
                <ChatPage socket={socket} userData={userData} />
              </div>
            ) : (
              <GuestNavbar setLogged={setLogged} setUserData={setUserData} />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
