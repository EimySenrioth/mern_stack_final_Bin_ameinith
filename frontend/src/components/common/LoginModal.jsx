import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Yup from 'yup';
import { z } from 'zod';
import { useMemo } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
import '../../styles/loginmodal.css';

const LoginModal = ({ visible, onClose, useZod = false, onLogin }) => {
  // Yup schema
  const yupSchema = useMemo(() => Yup.object({
    email: Yup.string().email('Email inválido').required('Requerido'),
    password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
  }), []);

  // Zod schema
  const zodSchema = useMemo(() => z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
  }), []);

  const resolver = useZod ? zodResolver(zodSchema) : yupResolver(yupSchema);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/auth/login', data);
      if (onLogin) onLogin(res.data.token); // Guarda el JWT
      onClose();
    } catch (err) {
      alert('Login fallido: usuario o contraseña incorrectos');
    }
  };

  if (!visible) return null;

  return createPortal(
    <div className="modal-backdrop" tabIndex={-1} aria-modal="true" role="dialog">
      <div className="modal">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <label htmlFor="login-email" style={{ display: 'none' }}>Email</label>
          <input
            id="login-email"
            {...register('email')}
            placeholder="Email"
            autoComplete="username"
            aria-invalid={!!errors.email}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <label htmlFor="login-password" style={{ display: 'none' }}>Contraseña</label>
          <input
            id="login-password"
            {...register('password')}
            type="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
          <button type="button" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </button>
        </form>
        {localStorage.getItem('token') && (
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('token'); // Elimina el token
              onLogin(null); // Actualiza el estado en App.jsx
              onClose(); // Cierra el modal
            }}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.2rem',
              background: '#e53e3e',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Salir
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;