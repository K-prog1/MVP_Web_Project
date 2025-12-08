import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../api/auth';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    position: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        position: formData.position
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>VETKA</h1>
          <p>Регистрация в системе нетворкинга</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="ФИО *"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Пароль *"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Подтвердите пароль *"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Компания"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Должность"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="form-input"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="auth-button"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Уже есть аккаунт? <Link to="/login" className="auth-link">Войти</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;