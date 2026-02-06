const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { leerArchivo, escribirArchivo } = require('../utils/fileHandler');

const router = express.Router();
const SECRET = 'clave_secreta';

// Registro
router.post('/register', async (req, res, next) => {
  try {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const usuarios = await leerArchivo('usuarios.json');
    const existe = usuarios.find(u => u.usuario === usuario);
    if (existe) {
      return res.status(400).json({ mensaje: 'Usuario ya existe' });
    }

    const hash = await bcrypt.hash(password, 10);
    usuarios.push({ usuario, password: hash });
    await escribirArchivo('usuarios.json', usuarios);

    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { usuario, password } = req.body;
    const usuarios = await leerArchivo('usuarios.json');

    const user = usuarios.find(u => u.usuario === usuario);
    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const valido = await bcrypt.compare(password, user.password);
    if (!valido) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ usuario }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
 