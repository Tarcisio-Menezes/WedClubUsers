import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

const Provider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [registerUser, setRegisterUser] = useState('');
  const [users, setUsers] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');

  const context = {
    userName,
    setUserName,
    registerUser,
    setRegisterUser,
    users,
    setUsers,
    bio,
    setBio,
    email,
    setEmail,
  };

  return (
    <MainContext.Provider value={ context }>
      {children}
    </MainContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.array,
}.isRequired;
