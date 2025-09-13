const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Si el error tiene un status, úsalo; si no, 500
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({ message });
};

export default errorHandler;