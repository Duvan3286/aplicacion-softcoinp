import React, { useEffect, useState } from 'react';
import './register-user-form.css';
import axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import { Box, Modal, Typography } from '@mui/material';
import { AnyARecord } from 'dns';

interface UserResponse {
  user: any;
  message: any;
  redirect:any;
  // Otras propiedades si existen en tu respuesta
}

type Props = {
  dataItem: any,
  onClose: any;
  onOpen : boolean;
};

  const RegisterUser: React.FC <Props> = (props: Props) =>{

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [typeUsers, setTypeUsers] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setId (props.dataItem.id);
    setUsername (props.dataItem.name);
    setEmail (props.dataItem.email);
    setTypeUsers(props.dataItem.type_users_id)
  }, [props.dataItem]);


  

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response : AxiosResponse<UserResponse> = await axios.post('http://185.255.131.51:85/api/registro', {
        id: id,
        name: username,
        email: email,
        password: password,
        type_users: typeUsers
      });

      const userData: UserResponse = response.data;
      if (userData.user) {
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        if(userData.redirect == 1){
          history.push('/menu');
        }else {
          
          location.reload();
        }
       
      } else {
        alert(userData.message);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      //setError('Hubo un problema al registrar el usuario.');
    }
  };



  return (
    <>
      <Modal
        open={props.onOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="register-user-form">
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Registro de Usuario
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <div className="rs-form-group">
                  <label htmlFor="username">Nombre de Usuario:</label>
                  <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="rs-form-group">
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="rs-form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="rs-form-group">
                  <label htmlFor="type_users">Tipo de usuario:   </label>
                  <select id="type_users" value={typeUsers} onChange={(e) => setTypeUsers(e.target.value)} required>
                    <option value="">Selecciona un tipo de usuario</option>
                    <option value="1">Administrador</option>
                    <option value="2">Operador</option>
                  </select><br></br>
                </div>
                <button type="submit" className="rs-button">Registrarse</button>
              </form>
              {error && <p className="error-message">{error}</p>}
            </Typography>
          </Box>
        </div>

      </Modal>




    </>
  );
}

export default RegisterUser;
