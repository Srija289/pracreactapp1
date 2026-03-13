import { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    setFormData({
      name: '',
      gender: '',
      email: '',
      password: '',
      contact: ''
    });
  };

  return (
    <div className="unique-registration-form">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="unique-form-group">
          <label className="unique-label">Name:</label>
          <input className="unique-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="unique-form-group">
          <label className="unique-label">Gender:</label>
          <select className="unique-select" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="unique-form-group">
          <label className="unique-label">Email:</label>
          <input className="unique-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="unique-form-group">
          <label className="unique-label">Password:</label>
          <input className="unique-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="unique-form-group">
          <label className="unique-label">Contact No:</label>
          <input className="unique-input" type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <button className="unique-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;