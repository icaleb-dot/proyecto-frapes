require('dotenv').config();
const mongoose = require('mongoose');
// Ajusta la ruta si tu modelo está en otra carpeta dentro de src
const MenuItem = require('./src/models/MenuItem'); 

const productos = [
  { nombre: "Frappe Oreo", precio: 30, tamano: "chico", categoria: "frappe", descripcion: "Delicioso frappé con galleta Oreo" },
  { nombre: "Frappe Oreo", precio: 55, tamano: "grande", categoria: "frappe", descripcion: "Delicioso frappé con galleta Oreo" },

  // Gansito
  { nombre: "Frappe Gansito", precio: 35, tamano: "chico", categoria: "frappe", descripcion: "Frappé sabor gansito con trozos" },
  { nombre: "Frappe Gansito", precio: 60, tamano: "grande", categoria: "frappe", descripcion: "Frappé sabor gansito con trozos" },

  // Fresa
  { nombre: "Frappe Fresa", precio: 30, tamano: "chico", categoria: "frappe", descripcion: "Clásico frappé de fresa natural" },
  { nombre: "Frappe Fresa", precio: 55, tamano: "grande", categoria: "frappe", descripcion: "Clásico frappé de fresa natural" },

  // Limón
  { nombre: "Frappe Limon", precio: 30, tamano: "chico", categoria: "frappe", descripcion: "Refrescante frappé de limón" },
  { nombre: "Frappe Limon", precio: 55, tamano: "grande", categoria: "frappe", descripcion: "Refrescante frappé de limón" },

  // Mazapán
  { nombre: "Frappe Mazapan", precio: 35, tamano: "chico", categoria: "frappe", descripcion: "Cremoso frappé de mazapán" },
  { nombre: "Frappe Mazapan", precio: 60, tamano: "grande", categoria: "frappe", descripcion: "Cremoso frappé de mazapán" },

  // Chocorrol
  { nombre: "Frappe Chocorrol", precio: 35, tamano: "chico", categoria: "frappe", descripcion: "Frappé especial de Chocorrol" },
  { nombre: "Frappe Chocorrol", precio: 60, tamano: "grande", categoria: "frappe", descripcion: "Frappé especial de Chocorrol" },

  // Chocolate
  { nombre: "Frappe Chocolate", precio: 30, tamano: "chico", categoria: "frappe", descripcion: "Frappé de chocolate intenso" },
  { nombre: "Frappe Chocolate", precio: 55, tamano: "grande", categoria: "frappe", descripcion: "Frappé de chocolate intenso" },

  // Mango/Chamoy
  { nombre: "Frappe Mango/Chamoy", precio: 30, tamano: "chico", categoria: "frappe", descripcion: "Frappé de mango con toque de chamoy" },
  { nombre: "Frappe Mango/Chamoy", precio: 55, tamano: "grande", categoria: "frappe", descripcion: "Frappé de mango con toque de chamoy" },

  // --- FRESAS CON CREMA ---

  { nombre: "Vaso Fresas", precio: 80, tamano: "grande", categoria: "fresas_c_crema", descripcion: "Vaso grande de fresas con crema especial" },
  { nombre: "Cazuela Fresas", precio: 60, tamano: "grande", categoria: "fresas_c_crema", descripcion: "Cazuela de barro con fresas con crema" }
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/frapes_db';
    
    await mongoose.connect(uri);
    console.log('🔌 Conectado a MongoDB para la siembra de datos');

    // Limpiar colección existente para no duplicar
    await MenuItem.deleteMany({});
    console.log('Menú anterior eliminado');

    await MenuItem.insertMany(productos);
    console.log(`Se insertaron ${productos.length} productos en el menú correctamente.`);

    process.exit();
  } catch (error) {
    console.error('Error poblando la base de datos:', error);
    process.exit(1);
  }
};

seedDB();