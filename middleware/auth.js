const jwt = require('jsonwebtoken');
const SECRET = 'clave_secreta';

function auth(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ mensaje: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
}

module.exports = auth;
