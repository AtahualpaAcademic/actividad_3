const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(bodyParser.json());

// Middleware de errores 
const errorHandler = require('./middleware/errorHandler');

// Rutas
const tareasRoutes = require('./routes/tareas');
const authRoutes = require('./routes/auth');

app.use('/api', authRoutes);
app.use('/api/tareas', tareasRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware de errores
app.use(errorHandler);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
 