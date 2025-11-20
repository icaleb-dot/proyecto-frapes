const MenuItem = require('../models/MenuItem');
const { redisClient } = require('../config/dbRedis');

const CACHE_KEY_MENU = 'menu:all';
const CACHE_EXPIRATION_SECONDS = 3600;


exports.getMenu = async (req, res) => {
  try {
    // 1. Intentar obtener el menú desde el caché de Redis
    const cachedMenu = await redisClient.get(CACHE_KEY_MENU);

    if (cachedMenu) {
      console.log('Cache HIT - Sirviendo desde Redis');
      return res.json(JSON.parse(cachedMenu));
    }

    // 2. Si no está en caché (Cache MISS), ir a MongoDB
    console.log('Cache MISS - Obteniendo desde MongoDB');
    const menu = await MenuItem.find();

    // 3. Guardar en Redis para la próxima vez ttl
    await redisClient.setEx(
      CACHE_KEY_MENU,
      CACHE_EXPIRATION_SECONDS,
      JSON.stringify(menu)
    );

    res.json(menu);
  } catch (err) {
    res.status(500).send('Error de Servidor');
  }
};


exports.createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();

    // IMPORTANTE: Si creamos algo nuevo, el caché anterior es inválido.
    // Debemos borrar (invalidar) el caché.
    await redisClient.del(CACHE_KEY_MENU);
    console.log('Cache INVALIDADO (borrado)');

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).send('Error de Servidor');
  }
};