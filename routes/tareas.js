const express = require('express');
const auth = require('../middleware/auth');
const { leerArchivo, escribirArchivo } = require('../utils/fileHandler');

const router = express.Router();

// Obtener tareas
router.get('/', auth, async (req, res, next) => {
  try {
    const tareas = await leerArchivo('tareas.json');
    res.json(tareas);
  } catch (error) {
    next(error);
  }
});

// Crear tarea
router.post('/', auth, async (req, res, next) => {
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const tareas = await leerArchivo('tareas.json');
    const nueva = {
      id: Date.now(),
      titulo,
      descripcion
    };

    tareas.push(nueva);
    await escribirArchivo('tareas.json', tareas);
    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
});

// Actualizar tarea
router.put('/:id', auth, async (req, res, next) => {
  try {
    const tareas = await leerArchivo('tareas.json');
    const index = tareas.findIndex(t => t.id == req.params.id);

    if (index === -1) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    tareas[index] = { ...tareas[index], ...req.body };
    await escribirArchivo('tareas.json', tareas);
    res.json(tareas[index]);
  } catch (error) {
    next(error);
  }
});

// Eliminar tarea
router.delete('/:id', auth, async (req, res, next) => {
  try {
    let tareas = await leerArchivo('tareas.json');
    tareas = tareas.filter(t => t.id != req.params.id);
    await escribirArchivo('tareas.json', tareas);
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
 