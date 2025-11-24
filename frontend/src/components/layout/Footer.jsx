// src/components/Layout/Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p>© {currentYear} Frappe App. Todos los derechos reservados.</p>
        <div style={styles.links}>
          <a href="#" style={styles.link}>Privacidad</a> | 
          <a href="#" style={styles.link}>Términos</a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '20px 40px',
    marginTop: 'auto', // Ayuda a que se quede en la parte inferior de la página
    width: '100%',
    boxSizing: 'border-box',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9em',
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  }
};

export default Footer;