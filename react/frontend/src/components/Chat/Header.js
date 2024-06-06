import React from 'react';
import './App.css';


const Header = ({ title, onBack, onClose, profilePic, onOptions }) => {
    return (
        <div className="header">
      {onBack && <button onClick={onBack} className="header-button">{'<'}</button>}
      {profilePic && <img src={profilePic} alt="Profile" className="header-profile-pic" />}
      <h1 className="header-title">{title}</h1>
      {onOptions && <button onClick={onOptions} className="header-button">...</button>}
      {onClose && <button onClick={onClose} className="header-button">X</button>}
    </div>
  );
};
// Header.defaultProps = {
//     onClose: () => console.log('Close not implemented'),
//   };

export default Header;
