import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../context/AuthContext';
import { Button, Form, FloatingLabel } from 'react-bootstrap';

interface LoginResponse {
  token: string;
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('AuthToken');
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post<LoginResponse>(`${config.api.url}/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('AuthToken', token);
      console.log('Logged in successfully!');
      setIsAuthenticated(true);
      navigate('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FloatingLabel>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="primary" type="submit">Login</Button>
      </Form>
{/*       <Button variant="primary" onClick={() => navigate('/signup')}> Załóż konto</Button>
 */}    </div>
  );
};

export default Login;