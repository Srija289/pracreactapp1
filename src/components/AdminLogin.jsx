import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', credentials);
    if (credentials.username.toLowerCase() === 'admin' && credentials.password === 'admin123') {
      console.log('Login successful');
      sessionStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="unique-admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="unique-form-group">
          <label className="unique-label">Username:</label>
          <input className="unique-input" type="text" name="username" value={credentials.username} onChange={handleChange} required />
        </div>
        <div className="unique-form-group">
          <label className="unique-label">Password:</label>
          <input className="unique-input" type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button className="unique-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;