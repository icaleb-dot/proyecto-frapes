// src/pages/AdminMenuPage.jsx
import React, { useState } from 'react';
import { createMenuItem } from '../api/menu';

function AdminMenuPage() {
  // 1. CORRECCIÓN: Estado inicial con nombres en ESPAÑOL y agregando 'tamano'
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: 'frappe', 
    tamano: 'mediano', // ¡OBLIGATORIO por tu Schema!
    descripcion: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const categories = ['frappe', 'fresas_c_crema', 'topping'];
  const sizes = ['chico', 'mediano', 'grande'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Convertir 'precio' a número
      [name]: name === 'precio' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(null);
    setLoading(true);

    try {
      if (formData.precio <= 0 || isNaN(formData.precio)) {
        throw new Error("El precio debe ser un número positivo.");
      }
      
      // Enviamos formData tal cual (ya tiene las llaves en español)
      const newItem = await createMenuItem(formData); 
      
      setMessage(`✅ Ítem "${newItem.nombre}" creado con éxito.`);
      
      // Resetear formulario
      setFormData({ nombre: '', precio: '', categoria: 'frappe', tamano: 'mediano', descripcion: '' }); 

    } catch (err) {
      console.error("Error al crear ítem:", err);
      setError(err.message || 'Fallo al crear el ítem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>➕ Crear Nuevo Ítem del Menú</h1>
      <p style={styles.subtitle}>Ruta solo para **Admin/Empleado**.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Nombre */}
        <div style={styles.formGroup}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required style={styles.input} />
        </div>

        {/* Precio */}
        <div style={styles.formGroup}>
          <label htmlFor="precio">Precio ($):</label>
          <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} min="0.01" step="0.01" required style={styles.input} />
        </div>

        {/* Categoría */}
        <div style={styles.formGroup}>
          <label htmlFor="categoria">Categoría:</label>
          <select id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required style={styles.input}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.replace(/_/g, ' ').toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Tamaño (NUEVO - Requerido por backend) */}
        <div style={styles.formGroup}>
          <label htmlFor="tamano">Tamaño:</label>
          <select id="tamano" name="tamano" value={formData.tamano} onChange={handleChange} required style={styles.input}>
            {sizes.map(size => (
              <option key={size} value={size}>{size.charAt(0).toUpperCase() + size.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div style={styles.formGroup}>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} style={styles.textarea} />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Guardando...' : 'Crear Ítem'}
        </button>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '20px' },
  subtitle: { color: '#6c757d', fontSize: '0.9em', marginBottom: '30px' },
  form: { padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' },
  formGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', fontWeight: 'bold' },
  input: { width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' },
  textarea: { width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', height: '80px' },
  button: { padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', width: '100%' },
  success: { color: 'green', marginTop: '15px', fontWeight: 'bold', textAlign: 'center' },
  error: { color: 'red', marginTop: '15px', fontWeight: 'bold', textAlign: 'center' }
};

export default AdminMenuPage;