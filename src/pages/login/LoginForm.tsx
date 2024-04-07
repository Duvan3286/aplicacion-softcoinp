import React, { useState } from 'react'; 
import './LoginForm.css'; 
import logo from '../../assets/logo-softcoinp.jpg'; 
import axios, { AxiosResponse } from 'axios'; 
//import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


interface UserResponse {
  user: any;
  message: any;
  // Otras propiedades si existen en tu respuesta
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const navigate = useNavigate();
  const history = useHistory();

  

  const handleSubmit = async (e:any) => {
   
    e.preventDefault();

    try {
      const response : AxiosResponse<UserResponse> = await axios.post('http://185.255.131.51:85/api/login', {
        name:name,
        email:username,
        password:password
      });

      const userData: UserResponse = response.data;

      // Manejar la respuesta del backend
      if(userData.user){
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
          history.push('/menu');
      } else{
        alert(userData.message);
      }

      // Aquí puedes redirigir al usuario o hacer cualquier otra acción basada en la respuesta del servidor
       
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Usuario o contraseña incorrectos.'); // Manejar errores de autenticación
    }
  };

  return (
    <div className="login-container">
      <div className="centrado"> 
        <img src={logo} alt="imagen logo softcoinp" width="250" height="250" /> 
      </div>
      <form onSubmit={handleSubmit}> 
        <div className="form-group"> 
          <label htmlFor="username">Nombre de Usuario:</label> 
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          /> 
        </div>
        <div className="form-group"> 
          <label htmlFor="password">Contraseña:</label> 
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          /> 
        </div>
        {error && <div className="error">{error}</div>} 
        <div className="form-group"> 
          <input type="submit" value="Iniciar Sesión" /> 
        </div>
        <div className="form-group"> 
          <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a><br></br>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
