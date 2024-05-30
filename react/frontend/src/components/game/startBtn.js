import React, { useState, useEffect } from 'react';

function StartButton({ navigate, user}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [userExist, setUserExist] = useState(false);


useEffect(() => {
  if (user.name && user.email) {
    setUserExist(true);
    setIsFormValid(true);
  }
  }, []);

  const handleStart = () => {
    if (isFormValid) {
      navigate('modes');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateForm(e.target.value, email);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateForm(name, e.target.value);
  };
  
  const validateForm = (name, email) => {
    const isValid = name.trim() !== '' && email.trim() !== '';
    user.name = name;
    user.email = email;
    setIsFormValid(isValid);
  };
    return (
    <div>
    {!userExist && (
      <div>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
      </div>
      </div>
    )}
      <button onClick={handleStart} disabled={!isFormValid}>
        Start
      </button>
    </div>
  );
}

export default StartButton;

