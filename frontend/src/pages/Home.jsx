import React, { useContext, useEffect, useState } from 'react';
import FormData from 'form-data';
import { Form, Card } from 'react-bootstrap';
import axios from 'axios';
import MainContext from '../context/MainContext';
import Header from '../components/Header';
import '../css/home.css';

require('dotenv').config();

function Home() {
  const { setUsers, users, userName, setUserName,
    email, setEmail, bio, setBio } = useContext(MainContext);

  const [respost, setRespost] = useState('');

  const host = process.env.HOST || 'localhost';

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  // funções axios de conexão com a api

  const getAllUsers = async () => {
    axios.get(`http://${host}:3005/users/`, { headers })
      .then((response) => {
        if (response.data) {
          return setUsers(response.data);
        }
      })
      .catch((errorOrResponse) => errorOrResponse);
  };

  const removeUser = async (userId) => {
    axios.delete(`http://${host}:3005/users/${userId}`, { headers })
      .then(() => setRespost(users))
      .catch((errorOrResponse) => errorOrResponse);
  };

  const editUser = async (userId) => {
    const body = {
      name: userName,
      bio,
    };
    axios.put(`http://${host}:3005/users/${userId}`, body, { headers })
      .then(() => setRespost(users))
      .catch((errorOrResponse) => errorOrResponse);
  };

  const addUser = async () => {
    const body = {
      name: userName,
      email,
      bio,
    };

    axios.post(`http://${host}:3005/users`, body, { headers })
      .then((response) => {
        if (response.data) {
          return setRespost(response.data);
        }
      })
      .catch((errorOrResponse) => errorOrResponse);
  };

  const addUserImage = (userId) => {
    const formData = new FormData();
    const imagefile = document.querySelector('#file');
    formData.append('image', imagefile.files[0]);
    axios.put(`http://${host}:3005/users/${userId}/image`, formData,
      { headers: { 'Content-Type': 'multipart/form-data',
        // eslint-disable-next-line no-underscore-dangle
        boundary: `${formData._boundary}` } })
      .then((data) => data)
      .catch((errorOrResponse) => errorOrResponse);
  };

  // Funções de renderização

  const addNewUser = () => (
    <section className="addUser">
      <h4>Adicionar ou editar usuário </h4>
      <p>
        Para editar um usuário, use os imputs abaixo e clique em editar
        no card de usuário que deseja alterar.
      </p>
      <Form.Control
        type="text"
        placeholder="Nome"
        onChange={ ({ target }) => setUserName(target.value) }
        required
      />
      <Form.Control
        type="text"
        placeholder="email@email.com"
        onChange={ ({ target }) => setEmail(target.value) }
        required
      />
      <Form.Control
        type="bio"
        placeholder="Nos diga brevemente sobre você"
        onChange={ ({ target }) => setBio(target.value) }
        required
      />
      <div>
        <button
          type="button"
          onClick={ () => addUser() }
          disabled={ !userName || !bio || !email }
        >
          Enviar
        </button>
      </div>
    </section>
  );

  const renderUsers = () => (
    <section className="users">
      <h4>Os usuários cadastrados são:</h4>
      <section className="cards">
        { users && users.map((user, index) => {
          const { _id } = user;
          const userImage = `http://${host}:3005/images/${_id}.jpeg`;
          return (
            <Card
              className="homeCard"
              style={ { width: '18rem' } }
              key={ index }
            >
              <img
                src={ userImage }
                alt="User profile"
              />
              <Card.Body>
                <Card.Title>
                  { user.name}
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                >
                  Bio:
                  {' '}
                  { user.bio }
                </Card.Subtitle>
                <Card.Subtitle
                  className="mb-2 text-muted"
                >
                  Email:
                  {' '}
                  { user.email }
                </Card.Subtitle>
                <button
                  type="button"
                  onClick={ () => editUser(_id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={ () => removeUser(_id) }
                >
                  Deletar
                </button>
                <form
                  id="uploadForm"
                  action="upload_file"
                  method="put"
                  encType="multipart/form-data"
                >
                  <Form.Control
                    type="file"
                    size="sm"
                    id="file"
                    name="file"
                  />
                  <input
                    type="submit"
                    value="Enviar foto"
                    onClick={ () => addUserImage(_id) }
                  />
                </form>
              </Card.Body>
            </Card>
          );
        })}
      </section>
    </section>
  );

  // Fim das funções

  useEffect(() => {
    async function getUsersByName() {
      await getAllUsers();
    }
    getUsersByName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [respost]);

  // Retorno de Home

  return (
    <div>
      <Header />
      { addNewUser() }
      { renderUsers() }
    </div>
  );
}

export default Home;
