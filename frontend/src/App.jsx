import React, { useState } from 'react';
import axios from 'axios'

export const App = () => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre
      }
      axios.post('http://localhost:3000/user', data).then((response) => {
        console.log(response.data)
        if(response.status == 200){
          alert('Exitoso')
        }else{
          alert(response.data)
        }
      })
  }catch (error){
    console.log('Error de servidor', error);
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
