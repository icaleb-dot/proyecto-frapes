// src/pages/Auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/auth'; // Importamos la función de la API

function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Los usuarios registrados desde el frontend son por defecto 'cliente'
    const userData = { nombre, email, password, rol: 'cliente' }; 

    try {
      const result = await registerUser(userData);
      
      setSuccess(result.msj || 'Registro exitoso. ¡Inicia sesión ahora!');
      // Tras un registro exitoso, limpiamos los campos y redirigimos al login
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 

    } catch (err) {
      // El backend devuelve 400 si el email ya existe o faltan datos
      setError(err.message || 'Error en el registro. Verifica los datos.'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>📝 Registro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nombre">Nombre Completo:</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 15px', backgroundColor: loading ? '#aaa' : '#28a745', color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Registrando...' : 'Registrarme'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '15px' }}>{success}</p>}
      </form>
      <p style={{ marginTop: '20px' }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default RegisterPage;