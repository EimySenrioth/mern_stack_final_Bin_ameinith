import axios from 'axios';
import { API_CONFIG } from '../../utils/constants/apiConstants';


// Configuración de la API pendiente


// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para request
apiClient.interceptors.request.use(
  (config) => {
    // Agregar tokens de autenticación 
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API functions
export const chatApi = {
  // Enviar mensaje al chatbot
  sendMessage: async (message) => {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.CHAT, {
        message
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al enviar mensaje');
    }
  },

  // Obtener conversaciones (para futuras implementaciones)
  getConversations: async () => {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CONVERSATIONS);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener conversaciones');
    }
  },

  // Crear nueva conversación
  createConversation: async () => {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.CONVERSATIONS);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear conversación');
    }
  }
};

export default apiClient;