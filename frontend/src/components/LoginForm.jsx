import React, { useState } from 'react';
import API from '../api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.access_token);
    alert('Connecté !');
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default LoginForm;
