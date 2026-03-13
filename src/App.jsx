import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import RegistrationForm from './components/RegistrationForm';
import AdminLogin from './components/AdminLogin';

import './styles.css';
import AdminDashboard from './components/AdminDashBoard';

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
