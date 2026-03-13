import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  const [apiData, setApiData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    contact: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'api' && apiData.length === 0) {
      axios.get('https://fakestoreapi.com/products')
        .then(response => setApiData(response.data))
        .catch(error => console.error('Error fetching API data:', error));
    }
  }, [activeTab, apiData.length]);

  const handleAddUser = (e) => {
    e.preventDefault();
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUser({
      name: '',
      gender: '',
      email: '',
      password: '',
      contact: ''
    });
    setShowAddForm(false);
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    sessionStorage.setItem('adminLoggedIn', 'false');
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <div className="tabs">
        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Registered Users</button>
        <button className={activeTab === 'api' ? 'active' : ''} onClick={() => setActiveTab('api')}>API Data</button>
      </div>
      {activeTab === 'users' && (
        <div>
          <h3>Registered Users</h3>
          <button onClick={() => setShowAddForm(!showAddForm)}>Add User</button>
          {showAddForm && (
            <form onSubmit={handleAddUser} style={{ marginTop: '20px' }}>
              <div>
                <label>Name:</label>
                <input type="text" name="name" value={newUser.name} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Gender:</label>
                <select name="gender" value={newUser.gender} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label>Email:</label>
                <input type="email" name="email" value={newUser.email} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" name="password" value={newUser.password} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Contact No:</label>
                <input type="tel" name="contact" value={newUser.contact} onChange={handleInputChange} required />
              </div>
              <button type="submit">Add User</button>
              <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </form>
          )}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td><button onClick={() => handleRemoveUser(index)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'api' && (
        <div>
          <h3>API Data (Products)</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {apiData.slice(0, 10).map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;