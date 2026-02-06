const jwt = require('jsonwebtoken');
const SECRET = 'clave_secreta';

/**
 * Middleware de Autenticación
 * Verifica que el usuario envíe un token JWT válido en los headers.
 */
function auth(req, res, next) {
  // Obtenemos el header de autorización
  const authHeader = req.headers['authorization'];

  // Verificamos si el header existe
  if (!authHeader) {
    return res.status(403).json({ mensaje: 'Token requerido' });
  }

  // Extraemos el token (manejando el formato 'Bearer <token>')
  // Si el header no tiene espacio, toma el valor directo
  const token = authHeader.includes(' ') ? authHeader.split(' ')[1] : authHeader;

  try {
    // Verificamos y decodificamos el token con la clave secreta
    const decoded = jwt.verify(token, SECRET);
    
    // Guardamos los datos del usuario en el objeto 'req' 
    // para que las siguientes rutas puedan saber quién es
    req.user = decoded;
    
    // Continuamos a la siguiente función o ruta
    next();
  } catch (error) {
    // Si el token expiró o la firma no coincide, devolvemos 401
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = auth;