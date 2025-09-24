export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');
export const isAuthenticated = () => !!getToken();

const handleLogout = () => {
  localStorage.removeItem('token'); // Elimina el token del almacenamiento local
  setAuth(false); // Actualiza el estado de autenticación
};