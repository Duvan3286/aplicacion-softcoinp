import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListUser.css'; 
import RegisterUser from './create';
import { IonContent } from '@ionic/react';

const ListUser: React.FC = () =>{
    const [usuarios, setUsuarios] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [dataItem, setDataItem] = useState([]);


    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const response = await axios.get('http://185.255.131.51:85/api/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        cargarUsuarios();
    }, []);

    const handleOpenForm = (dataItem:any)=>{
        setOpenForm(true);
        setDataItem(dataItem);
    }

    const handleCloseForm = ()=>{
        setOpenForm(false);
    }

    const deleteUser = async (id:any) => {
        try {
            const response = await axios.delete(`http://185.255.131.51:85/api/delete_user/${id}`);
            if (response.data.success) {
                
                console.log('Usuario eliminado correctamente');
                //cargarUsuarios();
                
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error al borrar usuario:', error);
            alert('Usuario eliminado correctamente.');
            window.location.reload();
        }
    };
        
    



    return (
        <IonContent scrollY={true}>
            <div className="list-user-container">
                <br />
                <h2 className="list-user-header">Lista de Usuarios</h2>
                <a onClick={() => handleOpenForm([])} className="link2">Crear Nuevo Usuario</a>
                <div className="list-user-vertical">
                    {usuarios.map((usuario: any) => (
                        <div className="user-item" key={usuario.id}>
                            <p><strong>ID:</strong> {usuario.id}</p>
                            <p><strong>Nombre:</strong> {usuario.name}</p>
                            <p><strong>Email:</strong> {usuario.email}</p>
                            <p><strong>Tipo de usuario:</strong> {usuario.type_users_id === 1 ? 'Administrador' : 'Operador'}</p>
                            <div className="action-buttons">
                                <button className="delete" onClick={() => deleteUser(usuario.id)}>Eliminar</button>
                                <button className="update" onClick={() => handleOpenForm(usuario)}>Actualizar</button>
                            </div>
                        </div>
                    ))}
                </div>
                {openForm && <RegisterUser onOpen={true} onClose={handleCloseForm} dataItem={dataItem} />}
            </div>
        </IonContent>
    );
    
}

export default ListUser;
