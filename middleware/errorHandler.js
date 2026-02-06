function errorHandler(err, req, res, next) {
  console.error(err.stack); // Útil para debugging en la consola

  // Si el error tiene un status específico lo usamos, si no, enviamos 500
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    mensaje: 'Ha ocurrido un error en el servidor',
    error: err.message
  });
}

module.exports = errorHandler;