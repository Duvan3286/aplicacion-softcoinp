import React, { useState, useEffect } from 'react'; // Importamos React y los hooks useState y useEffect
import './MainMenu.css'; // Importamos los estilos CSS si los tienes
import { useHistory } from 'react-router-dom';
//import Dropzone from 'react-dropzone'; // Importamos Dropzone para manejar la carga de archivos
import logo from '../../assets/logo_davo.jpg'; // Importamos el logo desde la carpeta de activos
import axios, { AxiosResponse } from 'axios';
import { IonContent } from '@ionic/react';

interface UserResponse {
  person: any;
  message:any;
  success:any;
  // Otras propiedades si existen en tu respuesta
}


  const MainMenu: React.FC = () =>{
 
    const [statusButton, setstatusButton] = useState(true);
    const [id, setId] = useState('');
    const [identification, setIdentification] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [typePerson, setTypePerson] = useState('');
    const [job, setJob] = useState('');
    const [destination, setDestination] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');

    //const navigate = useNavigate();  

  // Definimos el estado para la fecha y hora actual
  const [dateTime, setDateTime] = useState(new Date());
  // Definimos el estado para los archivos seleccionados
  const [files, setFiles] = useState([]);
  const localStorageUserData:any = localStorage.getItem('user_data');
  const [userData, setUserData] = useState(localStorageUserData ? JSON.parse(localStorageUserData) : '');
  const [userType, setuserType] = useState(userData.type_users_id);
 

  // useEffect para actualizar la fecha y hora cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Función para manejar la caída de archivos en Dropzone
  const handleDrop = (acceptedFiles:any) => {
    setFiles(acceptedFiles);
  };



  const searchPerson = async () =>{

    const response : AxiosResponse<UserResponse> = await axios.post('http://185.255.131.51:85/api/search_person', {
      identification: identification,
    });

    const userData: UserResponse = response.data;

    if(userData.person){
      setstatusButton (false);
      const personData = userData.person;
      setId(personData.id);
      setName(personData.name);
      setLastname(personData.lastname);
      setTypePerson(personData.type_person_id);
      setJob(personData.job);
      setDestination(personData.destination);
      setAddress(personData.address);
      setPhone(personData.phone);
      setEmail(personData.email);
      setReason(personData.reason);

    } else {
      setstatusButton (true);
      setId('');
      setName('');
      setLastname('');
      setTypePerson('');
      setJob('');
      setDestination('');
      setAddress('');
      setPhone('');
      setEmail('');
      setReason('');
    
  }
}


   const handleSubmit = async  (e:any) => {

    e.preventDefault();

    try {
      const response : AxiosResponse<UserResponse> = await axios.post('http://185.255.131.51:85/api/register_person', {
        id: id,
        identification: identification,
        name: name,
        lastname: lastname,
        type_person_id: typePerson,
        job: job,
        destination:destination,
        address:address,
        phone:phone,
        email:email,
        reason:reason

      });

      const userData: UserResponse = response.data;

      if(userData.person){
      
        const personData = userData.person;
        setId(personData.id);
      } else {
        alert(userData.message);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      //setError('Hubo un problema al registrar el usuario.');
    }

    };

    const deletePerson = async () => {
      try {
        const response : AxiosResponse<UserResponse>  = await axios.delete(`http://185.255.131.51:85/api/delete_person/${identification}`);
        const userData: UserResponse = response.data;

        if (userData.success) {
          setIdentification('');
          setName('');
          setLastname('');
          setTypePerson('');
          setJob('');
          setDestination('');
          setAddress('');
          setPhone('');
          setEmail('');
          setReason('');
          setstatusButton(true);
        } else {
          alert(userData.message);
        }
      } catch (error) {
        console.error('Error al borrar datos:', error);
        //setError('Hubo un problema al borrar los datos.');
      }

   };

  return (
    
    // Contenedor principal del menú
    <React.Fragment>
      <IonContent scrollY={true}>
    <div className="mm-container">
      
      {/* Columna izquierda del menú */}
      <div className="mm-column">
          

          <input type="text" id="identification" value={identification} onChange={(e) => setIdentification(e.target.value)} required />
          <button type="button" className="mm-button" onClick={searchPerson}>Buscar</button> 
       

        <br />
        <h2>Datos de ingreso</h2>
        {/* Formulario para ingresar datos */}
        <form onSubmit={handleSubmit}>
          <div className="mm-form-group">
            {/* Campos para ingresar datos personales */}

            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="lastname">Apellido:</label>
            <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />


            <label htmlFor="job">Cargo u Oficio:</label>
            <input type="text" id="job" value={job} onChange={(e) => setJob(e.target.value)} required />

            <label htmlFor="destination">Destino:</label>
            <input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            
            <label htmlFor="address">Direccion:</label>
            <input type="text" id="name" value={address} onChange={(e) => setAddress(e.target.value)} required />

            <label htmlFor="phone">Telefono:</label>
            <input type="text" id="name" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            <label htmlFor="email">Correo Electronico:</label>
            <input type="text" id="name" value={email} onChange={(e) => setEmail(e.target.value)} required /><br></br>

            <label htmlFor="type_person">Tipo de persona:   </label>
            <select id="type_person" value={typePerson} onChange={(e) => setTypePerson(e.target.value)} required>
            <option value="">Selecciona un tipo de persona</option>
            <option value="1">Empleado</option>
            <option value="2">Proveedor</option>
            <option value="3">Visitante</option>
            </select><br></br>

          
            <label htmlFor="reason">Motivo:</label>
            <textarea id="reason" name="reason" rows={5} cols={55} value={reason} onChange={(e) => setReason(e.target.value)} required />
            <button type="submit" className="mm-button">{ id ? 'Editar' : 'Guardar'} Datos</button>
            {userType == 1 && !statusButton && (
            <button type="button" className="mm-button" onClick={deletePerson}>Borrar Persona</button>)}

          </div>
        </form>
      </div>

      {/* Columna derecha del menú */}
      <div className="mm-column-2">
        <div className="mm-container-2">
          {/* Subcolumna izquierda */}
          <div className="mm-sub-column">
            {/* Botones de entrada y salida */}
            <button type="submit" className="mm-button-2">Entrada</button><br /><br />
            <button type="submit" className="mm-button-2">Salida  </button>
          </div>

          {/* Subcolumna central */}
          <div className="mm-sub-column">
            {/* Componente Dropzone para cargar archivos */}
            {/*<Dropzone onDrop={handleDrop}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} className="mm-sub-column">
                  <input {...getInputProps()} id="type_file_hidden" style={{ display: 'none' }} />
                  <button type="button" className="mm-button-3" id="foto-perfil">Foto De Perfil</button>
                </div>
              )}
            </Dropzone>*/}
            {/* Mostrar imágenes seleccionadas */}
            <div>
              {files.map((file:any) => (
                <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} />
              ))}
            </div>
          </div>
        
          <div className="mm-sub-column">
            <img src={logo} alt="logo de marca" width="120" height="145" style={{ borderRadius: '10px' }} />
          </div>
        </div>

        {/* Contenedor para mostrar la fecha y hora */}
        <div className="mm-container-3" style={{ flexDirection: 'column' }}>
          <h2>Fecha y hora de ingreso</h2>
          <div id="reloj">{dateTime.toLocaleString()}</div>
        </div>

        {/* Contenedor para los botones de crear reportes */}
        <div className="mm-container-4">
        {userType == 1 && (
          <form action="crear-reporte-novedad.html" method="post">
            <div className="mm-sub-column">
               {/*<button type="submit" className="mm-button-4"><i className="fas fa-exclamation-triangle fa-3x"></i><br /><br />Crear reporte de novedad</button><br /><br />*/}
            </div>
          </form>)}

          {/* Formulario para mostrar personal registrado */}
          <form action="personal-registrado.html" method="post">
            <div className="mm-sub-column">
               {/*<button type="submit" className="mm-button-4"><i className="fas fa-users fa-3x"></i><br /><br />Personal registrado</button><br /><br />*/}
            </div>
          </form>
        </div>

        {userType == 1 && (
        <div className="mm-container-5">
          {/* Formulario para ver historial de registros */}
          <div className="mm-sub-column">
            <form action="historial-registros.html" method="post">
             {/*} <button type="submit" className="mm-button-5">Historial de registros</button>*/}
            </form>
          </div>
          {/* Formulario para ingresar como administrador 
          <div className="mm-sub-column">
            <form action="administrador.html" method="post">
              <button type="submit" className="mm-button-5">Ingreso administrador</button>
            </form>
          </div>*/}
        </div>)}

        {userType == 1 && (
        <div className="form-group">
        <h1>Usuario Administrador<br></br>{userData.name}</h1>
        <a href="/registrar-usuario"className="link">Opciones de Usuario</a> 
        
        </div>)}

        {userType == 2 && (
        <h1>Usuario Operador<br></br>{userData.name}</h1>)}
      </div>
    </div>
    </IonContent>
   </React.Fragment>
   
  );


}

export default MainMenu; 