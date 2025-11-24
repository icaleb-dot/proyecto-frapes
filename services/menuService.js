const MenuItem = require('../models/MenuItem');
const { redisClient } = require('../config/dbRedis');

const CACHE_KEY_MENU = 'menu:all';
const CACHE_EXPIRATION_SECONDS = parseInt(process.env.MENU_CACHE_TTL);

const obtenerMenuCompleto = async () => {
  try {
    const cachedMenu = await redisClient.get(CACHE_KEY_MENU);
    
    if (cachedMenu) {
      console.log('  Cache HIT - Sirviendo desde Redis');
      return JSON.parse(cachedMenu);
    }
  } catch (error) {
    console.error('Error leve en Redis (Cache Miss forzado):', error);
    // Si falla Redis, no detenemos la app, seguimos a Mongo
  }

  console.log('  Cache MISS - Obteniendo desde MongoDB');
  const menu = await MenuItem.find();

  //cache-Aside
  
  if (menu.length > 0) {
    try {
      await redisClient.setEx(
        CACHE_KEY_MENU,
        CACHE_EXPIRATION_SECONDS,
        JSON.stringify(menu)
      );
      console.log('  Menú guardado en Redis');
    } catch (error) {
      console.error('Error guardando en Redis:', error);
    }
  }

  return menu;
};

const crearItemMenu = async (datosItem) => {
  //guardar en Mongo
  const newItem = new MenuItem(datosItem);
  const savedItem = await newItem.save();

  //invalidar Caché
  try {
    await redisClient.del(CACHE_KEY_MENU);
    console.log('  Cache INVALIDADO (borrado) por nuevo ítem');
  } catch (error) {
    console.error('Error limpiando caché:', error);
  }

  return savedItem;
};

module.exports = {
  obtenerMenuCompleto,
  crearItemMenu
};